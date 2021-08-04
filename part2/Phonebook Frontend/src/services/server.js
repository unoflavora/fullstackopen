import axios from "axios";

const baseUrl = '/api/persons'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (newObject) => {
    const request =  axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const exported = {get, add, del, update}

export default exported