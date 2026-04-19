/** Local files under /public — works with any Vite `base` */
export function assetUrl(relativePath) {
  const path = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${import.meta.env.BASE_URL}${path}`;
}
