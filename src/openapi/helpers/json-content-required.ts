import type { ZodSchema } from "@/openapi/helpers/types.js"

import jsonContent from "@/openapi/helpers/json-content.js"

function jsonContentRequired<T extends ZodSchema>(schema: T, description: string) {
  return {
    ...jsonContent(schema, description),
    required: true,
  }
}

export default jsonContentRequired
