// Usage: Configure the OpenAPI document and the API reference endpoint

import { apiReference } from "@scalar/hono-api-reference"

import type { AppOpenAPI } from "@/lib/types.js"

import packageJSON from "@/../package.json" with { type: "json" }

export default function configureOpenAPI(app: AppOpenAPI) {
  // OpenAPI JSON document
  // To configure the OpenAPI version, title, and other options,
  // refer: https://github.com/OAI/OpenAPI-Specification
  app.doc("/openapi.json", {
    openapi: "3.1.1",
    info: {
      version: packageJSON.version,
      title: packageJSON.name,
    },
  })

  // Endpoint for the API reference using Scalar UI
  // To configure the theme, default HTTP client, and other options,
  // refer: https://github.com/scalar/scalar/blob/main/integrations/hono/README.md
  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: "/openapi.json",
    }),
  )
}
