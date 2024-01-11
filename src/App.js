import React, { useState, useEffect } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        deadline: '',
        status: 'In Progress',
    });
  
    const handleToggleMode = () => {
        chrome.tabs.create({'url': "index.html"})
    };
  
    const handleTaskFormChange = (e) => {
        const { name, value } = e.target;
        setTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleRegisterTask = () => {
        // Implement task registration logic
        const newTask = { ...taskForm, id: tasks.length + 1 };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskForm({
            title: '',
            description: '',
            deadline: '',
            status: 'In Progress',
        });
    };
  
    return (
        <div className="App">
            <h1>Task Manager Extension</h1>
            <button onClick={handleToggleMode}>
                Toogle Tab Mode
            </button>
            <div className="taskForm">
                <h2>Task Registration</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={taskForm.title}
                        onChange={handleTaskFormChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={taskForm.description}
                        onChange={handleTaskFormChange}
                    />
                </label>
                <label>
                    Deadline:
                    <input
                        type="text"
                        name="deadline"
                        value={taskForm.deadline}
                        onChange={handleTaskFormChange}
                    />
                </label>
                <label>
                    Status:
                    <select
                        name="status"
                        value={taskForm.status}
                        onChange={handleTaskFormChange}
                    >
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Miss">Miss</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </label>
                <button onClick={handleRegisterTask}>
                    Register Task
                </button>
            </div>
        </div>
    );
};
  
export default App;