// client/src/components/TaskItem.js

import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const { _id, title, description, completed } = task;

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <div className="task-actions">
        <button onClick={() => onToggleComplete(_id)}>
          {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button onClick={() => onDelete(_id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;