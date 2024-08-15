import TodoList from '@components/pages/TodoList';
import React, { useState } from 'react';

export default function Main() {
  
  return (
    <main>
      <section>
        <div className="container">
          <h2>Todo List</h2>
          <TodoList />
        </div>
      </section>
    </main>
  );
  
}