import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt' 
import clientPromise from '../../../lib/db'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db('your_database_name') 


        const user = await db.collection('users').findOne({ username: credentials.username })

        // If user exists, compare the password
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (isPasswordValid) {
            return { id: user._id, name: user.username, email: user.email }
          } else {
            throw new Error('Invalid password')
          }
        } else {
          // If user not found, create a new account
          const hashedPassword = await bcrypt.hash(credentials.password, 10) 

          const newUser = {
            username: credentials.username,
            password: hashedPassword, 
            email: credentials.email || '', 
            createdAt: new Date(),
          }

          await db.collection('users').insertOne(newUser)

          return { id: newUser._id, name: newUser.username, email: newUser.email }
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email 
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email 
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
})
