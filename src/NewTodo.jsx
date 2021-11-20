import { useState } from "react";

function NewTodoItem({ onEnter }) {
  const [value, setValue] = useState("");

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={value}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onEnter(value);

            setValue("");
          }
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </header>
  );
}

export default NewTodoItem;
