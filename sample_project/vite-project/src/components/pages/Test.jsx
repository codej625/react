import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const message = "Network response was not ok";
          throw new Error(message);
        }
        const result = await response.json();
        setData(result);
      } 
      catch (error) { setError(error); }
    };

    fetchData();
    console.log(data);
  }, [url]);

  return { data, error };
}

export default function RouterTest() {
  const [value, setValue] = useState(false);
  const {data, error} = useFetch("https://jsonplaceholder.typicode.com/posts");

  const onClick = () => setValue((prev) => !prev);

  return (
    <>
      <p>
        <button onClick={onClick}>click</button>
      </p>
      <br />
      {value && (
        <>
          {error && <p>Error: {error.message}</p>}
          {data && (
            <ul>
              {data.map((user) => (
                <li key={`${user.userId}-${user.title}`}>{user.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
