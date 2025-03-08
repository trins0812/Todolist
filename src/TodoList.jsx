import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editing, setEditing] = useState(null); // State to track which task is being edited
  const [taskText, setTaskText] = useState(""); // State for editing text
  const [filter, setFilter] = useState("all"); // For filtering tasks
  const [darkMode, setDarkMode] = useState(false);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // Remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle completion status of a task
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditing(index);
    setTaskText(tasks[index].text);
  };

  // Save the edited task
  const saveEdit = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editing ? { ...task, text: taskText } : task
    );
    setTasks(updatedTasks);
    setEditing(null);
    setTaskText("");
  };

  // Filter tasks based on the filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  // Apply the saved theme from localStorage
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDarkMode !== null) setDarkMode(savedDarkMode);
  }, []);

  // Dynamic class for dark mode
  const darkModeClass = darkMode ? "dark" : "";

  return (
    <div className={`app-container ${darkModeClass}`}>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
            onClick={() => toggleCompletion(index)}
          >
            {editing === index ? (
              <>
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => startEditing(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}
