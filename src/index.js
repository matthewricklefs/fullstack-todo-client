import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import './styles.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      todo: "",
      todos: []
    }

  }

  componentDidMount() {
    axios
      .get("https://mjr-todo-api.herokuapp.com/todos")
      .then((res) => {
       this.setState({
        todos: res.data
      })
    })
      .catch((err) => console.log(err))
  }

  handleChange = e => {
    this.setState({
      todo: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <div>
          {todo.title}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>To Do List</h1>

        <form className="add-todo" onSubmit={this.handleSubmit}>

          <input
            type='text'
            placeholder='add to do'
            onChange={this.handleChange}
            value={this.state.todo}
          />

        <button type='submit'>Add</button>

        </form>

        {this.renderTodos()}
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

