import { useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useTodoListLogic } from '@script/pages/TodoListLogic';

function TodoList() {

  const {
    todos,
    newTodo,
    editingIndex,
    editedTodo,
    setNewTodo,
    setEditedTodo,
    addTodo,
    removeTodo,
    startEditing,
    finishEditing,
    cancelEditing,
    toggleCheckbox,
  } = useTodoListLogic();

  return (
    <div>
      <Input 
        className={'margin-right-1'}
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
            <li key={todo.key}>
              <Input
                className={'margin-right-1'}
                type={"checkbox"} 
                checked={todo.checked} 
                onChange={() => toggleCheckbox(index)} 
              />
              {
                editingIndex === index ? (
                  <>
                    <Input
                      className={'margin-right-1'}
                      type={"text"} 
                      value={editedTodo} 
                      onChange={(e) => setEditedTodo(e.target.value)} 
                    />
                    <Button
                      className={'margin-right-1'}
                      text={"Confirm"} 
                      onClick={() => finishEditing(index)} 
                    />
                    <Button 
                      text={"Cancel"} 
                      onClick={cancelEditing} 
                    />
                  </>
                ) : (
                  <>
                    <span className={`margin-right-1 ${todo.checked ? 'text-decoration' : 'text-decoration-none'}`}>{todo.text}</span>
                    <Button 
                      className={'margin-right-1'}
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