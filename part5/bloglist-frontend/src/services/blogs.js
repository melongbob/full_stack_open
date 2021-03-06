import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token }
  }

  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const url = baseUrl + `/${blogObject.id}`
  const response = await axios.put(url, blogObject, config)
  return response.data
}

const remove = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const url = baseUrl + `/${blogObject.id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }