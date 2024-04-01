const ASSETS_BASE_URL = 'https://nicosemp.com/melvor-vue-assets'

export const getAssetUrl = (relativePath: string) => {
  return `${ASSETS_BASE_URL}${relativePath}`
}
