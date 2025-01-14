import { apiReference } from "@scalar/hono-api-reference"

import type { AppOpenAPI } from "@/lib/types.js"

import packageJSON from "@/../package.json" with { type: "json" }

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/openapi.json", {
    openapi: "3.1.1",
    info: {
      version: packageJSON.version,
      title: packageJSON.name,
    },
  })

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      spec: {
        url: "/openapi.json",
      },
    }),
  )
}
