import { ZodSchema } from 'zod'

export async function parseJSON<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  const response = await request.json()
  const result = schema.safeParse(response)

  if (!result.success) {
    throw new Error('Invalid JSON structure')
  }

  return result.data
}
