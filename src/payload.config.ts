import { buildConfig } from "payload/config"
import path from "path"
import Admins from "./collections/Admins"
import Users from "./collections/Users"

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BACKEND_URL,
  admin: {
    user: Admins.slug, // admin dashboard collection (can be only one)
  },
  collections: [Admins, Users],
  // whitelist of domains to allow cookie auth from
  csrf: [String(process.env.PAYLOAD_PUBLIC_FRONTEND_URL)],
  cors: [String(process.env.PAYLOAD_PUBLIC_FRONTEND_URL)],
  cookiePrefix: "auth",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
})
