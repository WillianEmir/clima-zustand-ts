import { z } from "zod";

export const SchemaSearch = z.object({
  city: z.string(),
  country: z.string()
})

export const SchemaCountry = z.object({
  code: z.string(),
  name: z.string()
})

export const SchemaWeather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number()
  })
})