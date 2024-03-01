
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcryptjs from "bcryptjs"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

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

        const hashedPassword = await bcryptjs.hash(input.password,10)

       const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email:input.email,
          password:hashedPassword
          
        },
      });

      return {
        email:user.email,
        id: user.id,
        isVerified:user.emailVerified
      }
    }),



    verifyUser: publicProcedure
    .input(z.object({
      userId:z.string()
    }))
    .mutation(async({ctx, input})=>{
      await ctx.db.user.update({
        where:{
          id:input.userId
        },
        data:{
          emailVerified:new Date()
        }
      })
    })

   
     

});