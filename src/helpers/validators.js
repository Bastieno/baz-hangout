import { helpers } from 'vuelidate/lib/validators'

export const supportedFileType = value => {
  if (!helpers.req(value)) return true

  const supportedTypes = ['png', 'jpg', 'jpeg']
  const extension = value.split('.').pop()

  return supportedTypes.includes(extension)
}
