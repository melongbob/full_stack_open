const messageReducer = (state = '', action) => {
  switch(action.type) {
    case 'NOTIFY':
      return action.message
    // case 'CREATED_ANECDOTE':
    //   return action.message
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

var timeoutId;

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        message: ''
      })
    }, seconds*1000)
  }
}

// export const createAnecdoteMessage = (content) => {
//   return {
//     type: 'CREATED_ANECDOTE',
//     message: `you created '${content}'`
//   }
// }

export default messageReducer