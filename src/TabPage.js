import React, { useState, useEffect } from 'react';
import './css/TabPage.css';

const TabPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        deadline: '',
        status: 'In Progress',
    });
  
    const handleTaskFormChange = (e) => {
        const { name, value } = e.target;

        if (name === 'deadline') {

            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

            if (!dateTimeRegex.test(value)) {
                alert('Invalid date and time format. Please use YYYY-MM-DDTHH:mm');
                return;
            }

            const selectedDate = new Date(value);
            const currentDate = new Date();

            if (selectedDate <= currentDate) {
                // Display an error message or handle the date being not greater than the current date
                alert('Please select a date and time greater than the current date.');
                return;
            }
        }

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

    const organizeTasksByStatus = () => {
        const organizedTasks = {
            'In Progress': [],
            'Done': [],
            'Miss': [],
            'Canceled': [],
        };

        tasks.forEach((task) => {
            organizedTasks[task.status].push(task);
        });

        return organizedTasks;
    };

    const renderTasksInColumns = () => {
        const organizedTasks = organizeTasksByStatus();

        return (
            <div className="taskColumns">
                {Object.entries(organizedTasks).map(([status, tasksInStatus]) => (
                    <div key={status} className="taskColumn">
                        <h3>{status}</h3>
                        <div className="tasksInStatus">
                            {tasksInStatus.map((task) => (
                                <div key={task.id} className="taskItem">
                                    <strong>{task.title}</strong>
                                    <p>{task.description}</p>
                                    <p>Deadline: {task.deadline}</p>
                                    <p>Status: {task.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const loadFromStorage = async () => {
            try {
                const result = await new Promise((resolve) => {
                    chrome.storage.local.get(['tasks'], (data) => {
                        resolve(data.tasks);
                    });
                });

                setTasks(result);

            } catch (error) {
                alert('Error to load persisted data');
            }
        };

        loadFromStorage();
    }, []);

    useEffect(() => {
        chrome.storage.local.set({
            tasks: tasks
        });
    }, [tasks]);
  
    return (
        <div className="TabPage">
            <h1>Task Manager Extension</h1>
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
                        type="datetime-local"
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
            <div className="taskList">
                {renderTasksInColumns()}
            </div>
        </div>
    );
};
  
export default TabPage;