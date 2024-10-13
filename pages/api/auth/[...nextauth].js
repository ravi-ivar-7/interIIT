import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own logic here to validate credentials
        // This is a simple example, you should use a more secure method in production
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: 1, name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
})