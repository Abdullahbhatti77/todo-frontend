import { useState, useEffect } from "react";
import "./CreateTodo.css";
import axios from "axios";

export default function CreateTodo({ currentTodo, onUpdate }) {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo.title);
    } else {
      setTodo("");
    }
  }, [currentTodo]);

  const handleClick = () => {
    if (currentTodo) {
      // Update existing todo
      axios
        .put(
          `https://todo-backend-ten-mu.vercel.app/updateTodo/${currentTodo._id}`,
          { title: todo }
        )
        .then((res) => {
          onUpdate(res.data);
          setTodo("");
        })
        .catch((err) => console.log(err));
    } else {
      // Create new todo
      axios
        .post("https://todo-backend-ten-mu.vercel.app/createTodo", {
          title: todo,
        })
        .then(() => {
          setTodo("");
          window.location.reload(); // Refresh to show the new todo
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <input
        className="todo-input"
        type="text"
        value={todo}
        placeholder="Enter a new todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="add-todo-button" type="button" onClick={handleClick}>
        {currentTodo ? "Update Todo" : "Add Todo"}
      </button>
    </>
  );
}
