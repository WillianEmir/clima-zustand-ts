export const formatTemperature = (temperatura: number) : number => {
  const keilvin = 273.15
  return temperatura - keilvin
}