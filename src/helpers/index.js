export const rejectError = ({response}) => {
  let errorMessage = 'Oops, something went wrong'

  if(response && response.data && response.data.errors) {
    errorMessage = response.data.errors.message
  }

  return Promise.reject(errorMessage)
}

export const applyFilters = (url, filter) => {
  if (filter) {
    let filteredEntities = ''
    if (url.indexOf('?') === -1) {
      url += '?'
    } else {
      url += '&'
    }

    Object.keys(filter).forEach(key => {
      filteredEntities += `${key}=${filter[key]}&`;
    })

    if (filteredEntities.slice(-1) === '&') {
      filteredEntities = filteredEntities.slice(0, -1)
    }

    return url + filteredEntities
  }

  return url
}
