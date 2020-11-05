export function getToken () {
  return localStorage.getItem('TOKEN')
}

export function setToken (token) {
  return localStorage.setItem('TOKEN', token)
}

export function removeToken () {
  return localStorage.removeItem('TOKEN')
}
