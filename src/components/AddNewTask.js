import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import TaskList from './TaskList';
import './../App.css';

const DEFAULT_CATEGORIES = ['Work', 'Study', 'Personal', 'Market'];

function AddNewTask() {
    const filterCategoryLists = ['All', ...DEFAULT_CATEGORIES];
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(localStorage.getItem('lastSelectedCategory') || '');
    const [filter, setFilter] = useState('All');
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('lists')) || []);
    const inputRef = useRef(null);
    useEffect(() => { inputRef.current?.focus(); }, []);
    useEffect(() => { localStorage.setItem('lists', JSON.stringify(todoList)); }, [todoList]);

    const toggle = useCallback((id) => {
        setTodoList(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }, []);

    const filterTasks = useMemo(() => { return todoList.filter(t => (filter === 'All' ? true : t.category === filter)) }, [todoList, filter]);

    const isTitleValid = title.trim().length > 0;
    const isCategoryValid = category !== '';
    const isFormValid = isTitleValid && isCategoryValid;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        const itemObj = {
            id: todoList.length + 1,
            title: title.trim(),
            category: category,
            completed: false,
        }
        setTodoList(prev => [...prev, itemObj]);
        localStorage.setItem('lastSelectedCategory', category);
        setTitle('');
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const onDeleteTask = (id) => {
        setTodoList(prev => prev.filter(i => i.id !== id));
    };
    return (
        <div className='container'>
            <div className='card'>
                <h1 className='header'>Mini Task Tracker</h1>
                <p className='sub-header'>“Organize your day” — add tasks, pick a category, and track completion. Your tasks and last-used category are saved in your browser.</p>
                <div className='margin-top'>
                    <form onSubmit={handleSubmit} noValidate>
                        <p className='warning-text'>**All fields are mandatory.</p>
                        <input
                            id='inputbox#1'
                            ref={inputRef}
                            className='input'
                            type='text'
                            placeholder='**Add a task…'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <select
                            id='selectbox#1'
                            className='select'
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value={''} disabled>**Select a category</option>
                            {DEFAULT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button className='button width-25' type='submit' disabled={!isFormValid}>Add task</button>
                    </form>
                </div>
                <hr />
                <div className='margin-top'>
                    <p>Filter tasks by category:</p>
                    <select
                        id='selectbox#2'
                        className='select margin-top'
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        {filterCategoryLists.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <TaskList tasks={filterTasks} onToggle={toggle} deleteTask={onDeleteTask} />
                </div>
            </div>
        </div>
    );
}

export default AddNewTask
