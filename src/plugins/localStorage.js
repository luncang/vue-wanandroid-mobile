import WebStorageCache from 'web-storage-cache'

let localStorage = new WebStorageCache()



export function set(key, value) {
  localStorage.set(key, value)
}

export function get(key) {
  return localStorage.get(key)
}

export function remove(key) {
  localStorage.delete(key)
}

export function clear() {
  localStorage.clear()
}

export function setUserName(userName) {
  set('username', userName)
}

export function getUserName() {
  return get('username')
}

export function setUser(user) {
  set('user',user)
}

export function getUser() {
  return get('user')
}
