import { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import CreateTodo from "./CreateTodo";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    axios
      .get("https://todo-backend-ten-mu.vercel.app/getTodo")
      .then((res) => setTodos(res.data));
  }, [todos]);

  const deleteTodo = (id) => {
    axios
      .delete(`https://todo-backend-ten-mu.vercel.app/deleteTodo/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.log(err));
  };

  const startUpdateTodo = (todo) => {
    setCurrentTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setCurrentTodo(null);
  };

  return (
    <div className="app-container">
      <h2 className="header">Todo List</h2>
      <CreateTodo currentTodo={currentTodo} onUpdate={handleUpdateTodo} />
      <div className="todo-container">
        {todos.length === 0 ? (
          <div className="no-todos">No todos</div>
        ) : (
          todos.map((todo) => (
            <div className="todo-item" key={todo.id}>
              <span className="todo-title">{todo.title}</span>
              <FaRegEdit
                className="edit-icon"
                onClick={() => startUpdateTodo(todo)}
              />
              <FiTrash
                className="delete-icon"
                onClick={() => deleteTodo(todo._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
