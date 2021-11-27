import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { filter } from '../reducers/anecdoteReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.filter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {filter})(Filter)