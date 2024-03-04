import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isOAuth: boolean;
      email:string ;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ token,session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }


      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      
      return session
    },
    async jwt({ token}) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where:{
          id:token.sub
        }
      });

      if (!existingUser) return token;

      const existingAccount = await  db.account.findFirst({
        where:{
          userId:existingUser.id
        }
      })

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

    return token
  },
    
    
  },
  session:{
    strategy:"jwt"
  },
  adapter: PrismaAdapter(db) as Adapter,
 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        email: {  type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password){
  
          return null
        }
        console.log(credentials)

        const user = await db.user.findUnique({
          where:{
            email:credentials.email
          }
        })

        if(!user || !user.password){
          return null
        }


        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordCorrect) {
          return null
        }

        return user
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
