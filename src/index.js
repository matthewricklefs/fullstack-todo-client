import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem';

import './styles.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      todo: "",
      todos: [],
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
    axios
      .post("https://mjr-todo-api.herokuapp.com/todo", {
        title: this.state.todo,
        done: false
      })
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: ""
        })
      })
      .catch(err => console.error("handleSubmit Error: ", err))
  }

  deleteTodo = id => {
    axios
      .delete(` https://mjr-todo-api.herokuapp.com/todo/delete/${id} `)
      .then( () => {
        this.setState({
          todos: this.state.todos.filter(todo => {
            return todo.id !== id
          })
      })
    })
      .catch(err => console.error("deleteTodo Error: ", err))
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <TodoItem key={todo.id} {...todo} deleteTodo={this.deleteTodo} />
      )
    })
  }

  render() {
    return (
      <div className='app'>
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

