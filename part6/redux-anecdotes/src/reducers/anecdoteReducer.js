import anecdoteService from "../service/anecdote"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'vote':
      const anecdoteIndex = state.findIndex(anecdote => anecdote.id === action.data.id)
      const newState = [...state]
      newState[anecdoteIndex] = {...state[anecdoteIndex], votes: state[anecdoteIndex].votes + 1}
      return newState
    
    case 'add': 
      return state.concat(action.data)
    
    case 'init':
      return action.data

    case 'filter':
      return state.filter(anecdote => anecdote.content.includes(action.data))

    default: return state
  }
}

export const filter = (string) => {return {type: 'filter', data: string}}

export const addVote = (id, votes) => {
  return async dispatch => {
    await anecdoteService.vote(id, votes)
    dispatch({
      type: 'vote', 
      data: { id }
    })
  }
}


export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = asObject(anecdote)
    console.log('new', newAnecdote)
    await anecdoteService.add(newAnecdote)
    dispatch({
      type: 'add',
      data: newAnecdote
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.init()
    dispatch({
      type: 'init',
      data: anecdotes
    })
  }
}


export default reducer