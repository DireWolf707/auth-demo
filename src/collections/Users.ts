import { CollectionConfig } from "payload/types"

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 12 * 60 * 60, // 12 hrs (in sec)
    cookies: {
      secure: true,
      sameSite: "none",
      // domain: process.env.PAYLOAD_PUBLIC_FRONTEND_URL,
    },
    // verify: true, // { //email gen and subject gen fxns }
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) => {
        const resetPasswordURL = `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/reset-password/${token}`

        return `
        <!doctype html>
        <html>
          <body>
            <h1>
              Hello, ${user.name}!
            </h1>
            <p>
              You are receiving this because you (or someone else) have 
              requested the reset of the password for your account. 
            </p>
            <p>Click below to reset your password.</p>
            <p>
              <a href="${resetPasswordURL}">${resetPasswordURL}</a>
            </p>
            <p>
              If you did not request this, please ignore this email and your password will 
              remain unchanged.
            </p>
          </body>
        </html>
      `
      },
    },
    // strategies: [{strategy: (ctx)=>ctx.au,}],
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      // saveToJWT: true,
    },
  ],
}

export default Users
