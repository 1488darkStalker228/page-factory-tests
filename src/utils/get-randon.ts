export function getRandomString(length: number = 10): string {
  let str = ''
  while (length--) {
    let r = (Math.random() * 62) | 0

    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48))
  }
  return str
}
