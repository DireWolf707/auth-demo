import { CollectionConfig } from "payload/types"

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 12 * 60 * 60, // 12 hrs (in sec)
    cookies: {
      secure: true,
      sameSite: "lax",
      // domain: "???",
    },
    // verify: true, // { //email gen and subject gen fxns }
    // forgotPassword: { //email gen and subject gen fxns },
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
