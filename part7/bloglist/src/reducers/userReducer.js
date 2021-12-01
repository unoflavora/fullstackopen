import userService from "../services/user"
import { addError } from "./notificationReducer"
export default function userReducer(state = {}, action) {
  switch(action.type) {
    case 'INIT':
      return userService.getUser()
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      window.localStorage.clear()
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const data = await userService.login(username, password)
      userService.setUser(data)
      dispatch({
        type: 'LOGIN',
        data
      })
    } catch (e) {
      dispatch(addError(e.response.data.error))
    }
  }
} 