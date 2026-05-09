export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve({
        fileName: file.name,
        fileType: file.type,
        dataUrl: typeof reader.result === 'string' ? reader.result : '',
      })
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function isImageFile(file) {
  return Boolean(file?.type?.startsWith('image/'))
}
