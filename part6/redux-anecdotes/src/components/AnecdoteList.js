import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(vote(anecdote))}
          />
      )}
    </ div>
  )
}

export default AnecdoteList