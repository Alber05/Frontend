export function dateFormater(deadline) {
  const date = new Date(deadline)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const formatedData = date.toLocaleDateString('es-ES', options)

  return formatedData
}
