
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({

  signup: publicProcedure
    .input(z.object({ 
        name: z.string(),
        email:z.string(),
        password:z.string()
    }))
    .mutation(async ({ ctx, input }) => {
    
        const userAlreadyExists = await ctx.db.user.findUnique({
            where:{
                email:input.email
            }
        })
        if(userAlreadyExists){
            return new TRPCError({
                code:"CONFLICT",
                message:"User already exists"
            })
        }


      return await ctx.db.user.create({
        data: {
          name: input.name,
          
        },
      });
    }),

});
