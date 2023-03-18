import { CollectionConfig } from "payload/types"

const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true,
  },

  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "small",
        width: 42,
        height: 50,
        position: "centre",
      },
      {
        name: "large",
        width: 160,
        height: 180,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
    // adminThumbnail: "profile",
    // mimeTypes: ["image/*", "application/pdf"],
  },

  fields: [
    // {
    //   name: "user",
    //   type: "relationship",
    //   relationTo: "users",
    //   hasMany: false,
    //   unique: true,
    //   required: true,
    // }
  ],

  hooks: {
    // beforeChange: [
    //   async ({ data, req, operation, originalDoc }) => {
    //     if (req.user.collection === "users")
    //       return { ...data, user: req.user.id }
    //     return data
    //   }
    // ],

    afterChange: [
      async ({ doc, req, previousDoc, operation }) => {
        if (req.user.collection === "users" && operation === "create")
          await req.payload.update({
            collection: "users",
            id: req.user.id,
            data: { profilePicture: doc.id },
            user: req.user,
            overrideAccess: false,
          })
        return doc
      }
    ],

    afterDelete: [
      async ({ doc, req, id }) => {
        if (req.user.collection === "users")
          await req.payload.update({
            collection: "users",
            id: req.user.id,
            data: { profilePicture: null },
            user: req.user,
            overrideAccess: false,
          })
      }
    ]

  }
}

export default Media
