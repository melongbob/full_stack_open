import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
import { connect } from 'react-redux'

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

const AnecdoteList = (props) => {
  const anecdotesToShow = props.anecdotes.filter((anecdote => 
    anecdote.content.includes(props.filter))
  )
  
  return (
    <div>
      {anecdotesToShow
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              props.vote(anecdote)
              props.setNotification(`you voted ${anecdote.content}`, 5)
            }}
          />
      )}
    </ div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes