import React from "react"
let timeID

export default function reducer (state = '', action) {
  switch(action.type) {
    case 'ERROR':
      return <p className='error'>{action.notification}</p>
    case 'SUCCESS':
      return <p className='success'>{action.notification}</p>
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const addSuccess = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SUCCESS',
      notification
    })
    clearTimeout(timeID)
    timeID = setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 3000)
  }
}

export const addError = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'ERROR',
      notification
    })
    clearTimeout(timeID)
    timeID = setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 3000)
  }
}