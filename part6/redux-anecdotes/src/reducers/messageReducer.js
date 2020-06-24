const messageReducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTED':
      return action.message
    case 'CREATED_ANECDOTE':
      return action.message
    case 'CLEAR':
      return action.message
    default:
      return state
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR',
    message: ''
  }
}

export const voteMessage = (content) => {
  return {
    type: 'VOTED',
    message: `you voted '${content}'`
  }
}

export const createAnecdoteMessage = (content) => {
  return {
    type: 'CREATED_ANECDOTE',
    message: `you created '${content}'`
  }
}

export default messageReducer