export const rejectError = ({response}) => {
  let errorMessage = 'Oops, something went wrong'

  if(response && response.data && response.data.errors) {
    errorMessage = response.data.errors.message
  }

  return Promise.reject(errorMessage)
}
