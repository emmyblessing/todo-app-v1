import React, { useEffect } from 'react'

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);
  

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => (
      todo.id === id ? {title, id, completed} : todo
    ));
    setTodos(newTodo);
    setEditTodo("");
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!editTodo) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          title: input,
          completed: false
        }
      ]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input 
        type="text" 
        placeholder='Enter a todo...' 
        className='task-input' 
        value={input}
        required
        onChange={onInputChange}
      />
      <button className='button-add' type='submit'>
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  )
}

export default Form;