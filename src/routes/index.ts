import express from "express"
import { readdirSync } from "fs"
import { resolve } from "path"

const router = express.Router()

// read version of routes
const versions: string[] = readdirSync(resolve(__dirname)).filter((item: string) => !item.match(/\.js/))

// use routes version
for (const version of versions) {
  router.use(`/${version}`, require(`${resolve(__dirname, version)}`))
}

export default router
