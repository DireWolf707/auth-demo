import { CollectionConfig } from "payload/types"

const Admins: CollectionConfig = {
  slug: "admins",
  // To enable Authentication on a collection, set auth true or to an object containing the options
  // auth: true,
  auth: {
    maxLoginAttempts: 5,
    lockTime: 5 * 60 * 1000, // ms
    tokenExpiration: 12 * 60 * 60, // s
    cookies: {
      secure: true,
      sameSite: "lax",
      // domain: "???",
    },
    verify: true, // { //email gen and subject gen fxns }
    // forgotPassword: { //email gen and subject gen fxns },
    // strategies: [{strategy: (ctx)=>ctx.au,}],
    // useAPIKey: true,
    // depth: 0,
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email and password (salt and hash) added by default
    // Add more fields as needed
    {
      name: "name",
      type: "text",
      required: true,
      saveToJWT: true,
    },
  ],
}

export default Admins
