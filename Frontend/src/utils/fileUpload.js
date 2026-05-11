export function isImageFile(file) {
  return Boolean(file?.type?.startsWith('image/'))
}
