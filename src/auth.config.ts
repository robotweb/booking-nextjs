import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "@/actions/data";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

export const authConfig = {
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
    Resend({
      from: "noreply@robotweb.co.za",
      name: "Magic Link",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      //console.log("token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub as any;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.name && session.user) {
        session.user.name = token.name as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      try {
        const existingUser = await getUserById(token.sub as string);
        // @ts-ignore
        token.role = existingUser?.roles;
        token.name = existingUser?.name;
      } catch (error) {
        console.log("error", error);
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
