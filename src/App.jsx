import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    const taskName = e.target.taskName.value;
    const taskDescription = e.target.taskDescription.value;
    const taskPriority = e.target.priority.value;
    const taskDeadline = e.target.taskDeadline.value;

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      deadline: taskDeadline,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    e.target.reset(); // Reset the form
  };

  // Filter and Search
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesSearch = task.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && task.completed) ||
        (filterStatus === 'pending' && !task.completed);

      return matchesSearch && matchesStatus;
    });
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <header>
        <div className="head">
          <div>
            <img src="/src/assets/Applogo.png" alt="Logo" className="logo" height="100" />
          </div>
          <div>
            <h1 className="header"><b>Tick Track</b></h1>
          </div>
        </div>
        <h3>
          <b>Stay on Track, Stay on Top — Your Tasks, Organized and Simplified.</b>
        </h3>
      </header>

      <div className="container">
        {/* Task Form */}
        <form id="taskForm" onSubmit={handleAddTask}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input type="text" name="taskName" placeholder="Enter task name" required />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription">Description</label>
            <textarea name="taskDescription" placeholder="Enter task description" rows="3"></textarea>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="priority-options">
              <label>
                <input type="radio" name="priority" value="high" required /> High
              </label>
              <label>
                <input type="radio" name="priority" value="medium" /> Medium
              </label>
              <label>
                <input type="radio" name="priority" value="low" /> Low
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="taskDeadline">Deadline</label>
            <input type="date" name="taskDeadline" required />
          </div>

          <button type="submit">Add Task</button>
        </form>

        {/* Search and Filter */}
        <div className="filter-group">
          <input
            type="text"
            id="searchTask"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Task List */}
        <div className="task-list" id="taskList">
          {getFilteredTasks().map((task) => (
            <div key={task.id} className={`task ${task.priority}-priority ${task.completed ? 'completed' : ''}`}>
              <div className="task-details">
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <p className="task-priority">Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                <p>Deadline: {task.deadline}</p>
              </div>
              <div className="task-buttons">
                <button onClick={() => toggleComplete(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
