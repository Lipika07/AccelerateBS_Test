import React, { useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects, projectName]);
    setProjectName('');
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = { name: taskName, startTime: new Date() };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const handleTaskStop = (taskIndex) => {
    const endTime = new Date();
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].endTime = endTime;
    updatedTasks[taskIndex].timeSpent = endTime - updatedTasks[taskIndex].startTime;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Create a project</h2>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
        />
        <button type="submit">Add Project</button>
      </form>
      <h2>Create a task</h2>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <button type="submit">Add Task</button>
      </form>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}
            {task.endTime ? (
              <span> Time spent: {task.timeSpent / 1000} seconds</span>
            ) : (
              <button onClick={() => handleTaskStop(index)}>Stop</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
