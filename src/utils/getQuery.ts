export const getQuery = (url: string) =>
  url.slice(url.indexOf('?') + 1, url.length)
