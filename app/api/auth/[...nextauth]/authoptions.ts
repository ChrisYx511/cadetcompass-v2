import { NextAuthOptions } from "next-auth"
import AzureAD from "next-auth/providers/azure-ad"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.username = profile.preferred_username
      }
      return token
    },
    async session({ session, token, user }: any) {
      session.user.id = token.sub
      session.user.username = token.username
      if (!session.user.email) {
        session.user.email = session.user.username
      }
      return session
    },
  },
}
