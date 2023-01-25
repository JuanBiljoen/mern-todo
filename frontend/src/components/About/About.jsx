// import { useEffect, React } from "react";
// import axios from "axios";
// import { useState } from "react";

// const About = () => {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:8080/todo/view", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((response) => {
//         setTodos(response);
//       });
//   }, []);

//   // axios.get("http://localhost:8080/todo/view").then((response) => {
//   //   console.log(response);
//   // });

//   return (
//     <>
//       <h1>Getting all the todos here</h1>
//       {todos.map((todo) => {
//         <ul>
//           <li>{todo.todo}</li>
//         </ul>;
//       })}
//     </>
//   );
// };

// export default About;
