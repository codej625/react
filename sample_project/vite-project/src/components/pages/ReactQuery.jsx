// import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!response.ok) throw new Error('Network response was not ok');

  return response.json();
}

export default function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.title}>
            <span>{item.userId}</span><br/>
            <span>{item.id}</span><br/>
            <span>{item.title}</span><br/>
            <span>{item.completed}</span>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}