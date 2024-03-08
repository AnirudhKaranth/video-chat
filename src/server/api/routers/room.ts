import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  RoomServiceClient,
  Room,
  AccessToken,
  AccessTokenOptions,
  VideoGrant,
} from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.NEXT_PUBLIC_LIVEKIT_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

//create token
const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    userInfo,
  );
  at.addGrant(grant);
  return at.toJwt();
};

export const roomRouter = createTRPCRouter({
  //Mutation to create a room
  createRoom: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const userName = ctx.session.user.name;

    const room = await ctx.db.room.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    await roomService.createRoom({
      name: room.id,
    });
    const grant: VideoGrant = {
      room: room.id,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };
    const token = createToken(
      { identity: userId, name: userName as string },
      grant,
    );
    const result = {
      roomName: room.id,
    };

    return result;
  }),

  //Query to join a room
  joinRoom: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const userName = ctx.session.user.name;

      const grant: VideoGrant = {
        room: input.roomId,
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
      };
      try {
        const token = await createToken(
          { identity: userId, name: userName as string },
          grant,
        );
        const result: {
          identity: string; //type definition
          accessToken: string;
        } = {
          identity: userId,
          accessToken: token,
        };

        const participant = await ctx.db.participant.findUnique({
          where: {
            userId_roomId: {
              userId: ctx.session.user.id,
              roomId: input.roomId,
            },
          },
        });
        if (!participant) {
          await ctx.db.participant.create({
            data: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              Room: {
                connect: {
                  id: input.roomId,
                },
              },
            },
          });
        }

        return result;
      } catch (error) {
        console.log(error);
      }
    }),

    getRoomsByUser: protectedProcedure.query(async ({ ctx }) => {
        const rooms = await ctx.db.room.findMany({
          where: {
            OR: [
              {
                user: {
                  id: ctx.session.user.id,
                },
              },
              {
                participants: {
                  some: {
                    userId: ctx.session.user.id,
                  },
                },
              },
            ],
          },
        });
    
        return rooms;
      }),
});
