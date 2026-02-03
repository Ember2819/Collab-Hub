import React, { useState } from "react";

const TodoBoard = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded flex justify-between items-center"
          >
            {todo}
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoBoard;
