import { useState, useRef } from "react";
import useOutsideClick from "@rooks/use-outside-click";

function TodoItem({ todo, onDestroy, onChecked, onChange }) {
  const [value, setValue] = useState(todo.label);
  const [editing, setEditing] = useState(false);

  const pRef = useRef(null);

  useOutsideClick(pRef, () => {
    setEditing(false);
  });

  return (
    <li
      className={editing ? "editing" : todo.done ? "completed" : ""}
      onDoubleClick={() => {
        if (!editing) {
          setEditing(true);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setEditing(false);
          setValue(todo.label);
        } else if (e.key === "Enter") {
          onChange(value);
          setEditing(false);
        }
      }}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={onChecked}
        />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        ref={pRef}
        className="edit"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </li>
  );
}

export default TodoItem;
