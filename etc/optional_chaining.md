# Optional chaining

<br /><br />

```
번거롭게 초기 데이터값을 설정하기보다 null로 선언하고,
객체.값에 접근할 때 Optional chaining을 활용해보자.
```

<br /><br /><br />

1. 예시

```jsx
const UserProfile = ({ user}) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>City: {user?.address?.city}</p>
    </div>
  );
};
```
