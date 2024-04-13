import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useTodoListLogic() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const uuid = uuidv4();
      console.log(uuid);
      setTodos([...todos, { key: uuid, text: newTodo, checked: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const check = confirm('삭제하시겠습니까?');
    if (check) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      return setTodos(newTodos);
    }
    alert('삭제를 취소하였습니다.');
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditedTodo(todo.text);
  };

  const finishEditing = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editedTodo;
    setTodos(newTodos);
    setEditingIndex(null);
    setEditedTodo('');
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedTodo('');
  };

  const toggleCheckbox = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return {
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
  };
}