import { z } from "zod"
import { SchemaCountry, SchemaSearch, SchemaWeather } from "../schemas"

export type Search = z.infer<typeof SchemaSearch>
export type Country = z.infer<typeof SchemaCountry>
export type Weather = z.infer<typeof SchemaWeather>