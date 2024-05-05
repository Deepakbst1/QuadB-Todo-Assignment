import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteTask, selectCompletedTasks } from "../redux/Task/taskSlice.js";
import TaskCard from "../components/TaskCard.jsx";
import UpdateTask from "../components/UpdateTask.jsx";
import InputTask from "../components/InputTask.jsx";


// function completed contain two state  show and update state 
function Completed() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});

  const tasks = useSelector(selectCompletedTasks);
  const dispatch = useDispatch();
// function to control delete task
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };
// update created task 
  const handleOpenEditModal = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };
// closed after edit
  const handleCloseEditModal = () => {
    setTaskToUpdate({});
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-semibold">Completed Tasks</h1>
        <InputTask />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            handleOpenEditModal={handleOpenEditModal}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {showModal && (
        <UpdateTask
          taskToUpdate={taskToUpdate}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default Completed;
