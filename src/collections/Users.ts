import { CollectionConfig } from "payload/types"
import { IncomingAuthType } from "payload/dist/auth/types"
// import List from 'payload/dist/admin/components/views/collections/List/Default'

const auth: IncomingAuthType = {
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
}

const Users: CollectionConfig = {
  slug: "users",

  auth,

  admin: {
    useAsTitle: "name",
    group: "Authentication",
    disableDuplicate: true,
    // description: 'description of collection',
    // components: {
    //   views: {
    //     List: (props) => {
    //       props.collection.upload = false
    //       return List(props)
    //     },
    //   },
    // },
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
      minLength: 2,
      // saveToJWT: true,
      // validate: fnx // send true or string in case of error
    },

    {
      name: "profilePicture",
      type: "upload",
      relationTo: "media",
      // filterOptions: { mimeType: { contains: "image" } },
      // maxDepth: 0,
    },
  ],

  /*
  hooks: {
    // async functions run in series while sync fxns dont
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (operation === "create" || !req.files.file) return data

        if (originalDoc.profilePicture) {
          await req.payload.update({
            collection: "media",
            id: originalDoc.profilePicture,
            data: {},
            file: req.files["file"],
            overrideAccess: false,
            user: req.user,
          })
          return data
        } else {
          const profilePicture = await req.payload.create({
            collection: "media",
            data: {},
            file: req.files["file"],
            overrideAccess: false,
            user: req.user,
          })
          return { ...data, profilePicture: profilePicture.id }
        }
      },
    ],

    afterChange: [
      async ({ doc, req, previousDoc, operation }) => {
        if (operation === "create") return doc
        if (previousDoc.profilePicture && !doc.profilePicture)
          await req.payload.delete({
            collection: "media",
            id: previousDoc.profilePicture,
            overrideAccess: false,
            user: req.user,
          })
        return doc
      },
    ],
  }, */

  /*
  endpoints: [
    {
      path: "/:id",
      method: "put",
      handler: async (req, res, next) => {
        // console.log(req.payload.collections['media'].Model);
        let user, profilePicture
        try {
          user = await req.payload.update({
            collection: "users",
            id: req.params.id,
            data: { profilePicture: profilePicture.id },
            depth: 0,
          })
        } catch (error) {
          return res.send(error)
        }
        return res.send(user)
      },
    },
  ],
  */

}

export default Users
