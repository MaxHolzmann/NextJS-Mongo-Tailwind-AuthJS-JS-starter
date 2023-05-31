import  NextAuth  from "next-auth/next"
import  GoogleProvider  from "next-auth/providers/google"
import clientPromise  from "../../../db/config/"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";


export default NextAuth.default({
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
})
