import { useState } from "react";
import Footer from "./Footer";
import TodoItem from "./TodoItem";
import NewTodo from "./NewTodo";

let _id = 0;
const createId = () => ++_id;

const defaultTodos = [
  {
    id: createId(),
    label: "Taste Javascript",
    done: true,
  },
  {
    id: createId(),
    label: "learn reactjs",
    done: false,
  },
];

const VisibilityFilter = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

const getNActiveTodos = (todos) => {
  return todos.reduce((sum, item) => {
    if (!item.done) return sum + 1;

    return sum;
  }, 0);
};

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [filter, setFilter] = useState(VisibilityFilter.All);

  const visibleTodos = todos.filter((item) => {
    if (filter === VisibilityFilter.All) return true;

    if (filter === VisibilityFilter.Active) return !item.done;

    if (filter === VisibilityFilter.Completed) return item.done;
  });

  const isVisibleClearComp = todos.some((item) => item.done);

  const onEnter = (label) => {
    const newItem = {
      label,
      done: false,
      id: createId(),
    };
    setTodos((list) => [newItem, ...list]);
  };

  const onTodoDestroy = (todo) => {
    setTodos((list) => list.filter((item) => item !== todo));
  };

  const onTodoChecked = (todo) => {
    setTodos((list) =>
      list.map((item) => {
        if (todo === item) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      })
    );
  };

  const onTodoLabelChange = (todo, label) => {
    setTodos((list) =>
      list.map((item) => {
        if (todo === item) {
          return {
            ...item,
            label,
          };
        }
        return item;
      })
    );
  };

  const toggleAll = () => {
    setTodos((list) => {
      const done = list.some((item) => !item.done);
      return list.map((item) => ({
        ...item,
        done,
      }));
    });
  };

  const onClearCompleted = () => {
    setTodos((list) => list.filter((item) => !item.done));
  };

  return (
    <>
      <section className="todoapp">
        <NewTodo onEnter={onEnter} />
        {/* This section should be hidden by default and shown when there are todos */}
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {visibleTodos.map((item) => (
              <TodoItem
                key={item.id}
                todo={item}
                onDestroy={() => onTodoDestroy(item)}
                onChecked={() => onTodoChecked(item)}
                onChange={(label) => onTodoLabelChange(item, label)}
              />
            ))}
          </ul>
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            {/* This should be `0 items left` by default */}
            <span className="todo-count">
              <strong>{getNActiveTodos(todos)}</strong> item left
            </span>
            {/* Remove this if you don't implement routing */}
            <ul className="filters">
              {Object.keys(VisibilityFilter).map((key) => (
                <li key={key}>
                  <a
                    onClick={() => setFilter(key)}
                    className={filter === key ? "selected" : ""}
                    href="#/"
                  >
                    {key}
                  </a>
                </li>
              ))}
            </ul>
            {/* Hidden if no completed items are left ↓ */}
            {isVisibleClearComp && (
              <button onClick={onClearCompleted} className="clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>

      <Footer />
    </>
  );
}

export default App;
