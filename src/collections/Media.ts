import { CollectionConfig } from "payload/types"

const Media: CollectionConfig = {
  slug: "media",
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
    // adminThumbnail: "profile",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [],
}

export default Media
