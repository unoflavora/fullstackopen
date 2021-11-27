const reducer = (state = '', action) => {
  switch(action.type) {
    case 'Notify':
      return action.data
    case 'Reset':
      return ''
    default:
      return state
  }
}

let timeoutID 


export const notify = (notification, timeout) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({type: 'Notify', data: notification})  
    timeoutID = setTimeout(() => dispatch({type: 'Reset'}), timeout)
  }
}

export const reset = () => {
  return {type: 'Reset'}
}


export default reducer