// import { useEffect, useId } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useTodoListLogic } from '@script/pages/TodoList';

function TodoList() {

  const {
    todos,
    newTodo,
    editingIndex,
    editedTodo,
    key,
    inputFocus,
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
    <div className="container">
      <Input 
        className={"add-design-input margin-right-1"}
        type={"text"} 
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder={"Add new todo"}
        ref={inputFocus}
      />
      <Button
        className={"add-design-button"}
        text={"Add"} 
        onClick={addTodo} 
      />
      <ul>
        {
          todos.map((todo, index) => (
            <li className="margin-top-1" key={key+index}>
              {
                editingIndex === index ? (
                  <>
                    <Input
                      className={"margin-right-1"}
                      type={"text"} 
                      value={editedTodo} 
                      onChange={(e) => setEditedTodo(e.target.value)} 
                    />
                    <Button
                      className={"margin-right-1"}
                      text={"Confirm"} 
                      onClick={() => finishEditing(index)} 
                    />
                    <Button 
                      text={"Cancel"} 
                      onClick={cancelEditing} 
                    />
                  </>
                ) : (
                  <div>
                    <Input
                      className={"margin-right-1"}
                      type={"checkbox"} 
                      checked={todo.checked} 
                      onChange={() => toggleCheckbox(index)} 
                    />
                    <Input 
                      className={`add-design-input add-list text-overflow margin-right-1 ${todo.checked ? "text-decoration" : "text-decoration-none"}`}
                      type={"text"} 
                      value={todo.text}
                      readOnly={true}
                    />
                    <Button
                      className={"add-design-button margin-right-1"}
                      text={"Edit"} 
                      onClick={() => startEditing(index, todo)} 
                    />
                    <Button
                      className={"add-design-button"} 
                      text={"Remove"} 
                      onClick={() => removeTodo(index)} 
                    />
                  </div>
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