import React, { useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';

function TodoList() {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  /* Add */
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo('');
    }
  };

  /* Remove */
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  /* Update */
  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditedTodo(todo.text);
  };

  /* Update check */
  const finishEditing = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editedTodo;
    setTodos(newTodos);
    setEditingIndex(null);
    setEditedTodo('');
  };

  /* Update cancel */
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedTodo('');
  };

  /* Checkbox check */
  const toggleCheckbox = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <Input 
        type={"text"} 
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder={"Add new todo"}
      />
      <Button
        text={"Add"} 
        onClick={addTodo} 
      />
      <ul>
        {
          todos.map((todo, index) => (
            <li key={index}>
              <Input 
                type={"checkbox"} 
                checked={todo.checked} 
                onChange={() => toggleCheckbox(index)} 
              />
              {
                editingIndex === index ? (
                  <>
                    <Input 
                      type={"text"} 
                      value={editedTodo} 
                      onChange={(e) => setEditedTodo(e.target.value)} 
                    />
                    <Button 
                      text={"Confirm"} 
                      onClick={() => finishEditing(index)} 
                    />
                    <Button 
                      text={"Cancel"} 
                      onClick={() => cancelEditing} 
                    />
                  </>
                ) : (
                  <>
                    <span style={{ textDecoration: todo.checked ? "line-through" : "none" }}>{todo.text}</span>
                    <Button 
                      text={"Edit"} 
                      onClick={() => startEditing(index, todo)} 
                    />
                    <Button 
                      text={"Remove"} 
                      onClick={() => removeTodo(index)} 
                    />
                  </>
                )
              }
            </li>
          ))
        }
      </ul>
    </div>
  );

}

export default TodoList;