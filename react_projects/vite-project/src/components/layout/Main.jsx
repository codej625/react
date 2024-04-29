import TodoList from '@components/pages/TodoList';

function Main() {

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

export default Main;