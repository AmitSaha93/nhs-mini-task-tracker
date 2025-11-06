import React from 'react'

function TaskList({ tasks, onToggle, deleteTask }) {
  return (
    <ul className='list'>
      {tasks.length === 0 && (
        <li className='item' style={{ opacity: 0.7 }}>No tasks yet.</li>
      )}

      {tasks.map(t => (
        <li className='item' key={t.id}>
          <input
            type='checkbox'
            checked={t.completed}
            onChange={() => onToggle(t.id)}
          />
          <span className={t.completed ? 'title strikeThrough' : 'title'}>
            {t.title}
          </span>
          <span className='badge'>{t.category}</span>
          <span className='delete-btn' onClick={() => deleteTask(t.id)}>Delete</span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
