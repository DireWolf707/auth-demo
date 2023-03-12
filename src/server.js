import express from "express"
import payload from "payload"
require("dotenv").config()

const start = async () => {
  const app = express()

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    email: {
      logMockCredentials: true,
      fromAddress: "admin@cms.com",
      fromName: "Site Admin",
    },
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.use(payload.authenticate)

  // app.get("/", (req, res) => {
  //   if (req?.user) return res.send(`Authenticated successfully as ${req?.user.email}.`)
  //   return res.send("Not authenticated")
  // })
  // // Add your own express routes here

  app.listen(process.env.PORT)
}

start()
