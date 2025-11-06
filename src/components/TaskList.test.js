import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';


describe('<TaskList />', () => {
    test('renders empty state', () => {
        render(<TaskList tasks={[]} onToggle={() => { }} deleteTask={() => {}} />);
        expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });

    test('renders tasks with title and category badge', () => {
        const tasks = [
            { id: 1, title: 'Buy milk', category: 'Market', completed: false },
            { id: 2, title: 'Read book', category: 'Personal', completed: true },
        ];
        render(<TaskList tasks={tasks} onToggle={() => { }} deleteTask={() => {}} />);
        expect(screen.getByText('Buy milk')).toBeInTheDocument();
        expect(screen.getByText('Read book')).toBeInTheDocument();
        expect(screen.getAllByText('Market')[0]).toHaveClass('badge');
        expect(screen.getAllByText('Personal')[0]).toHaveClass('badge');
    });

    test('calls onToggle when checkbox clicked', () => {
        const tasks = [{ id: 1, title: 'Buy milk', category: 'Market', completed: false }];
        const onToggle = jest.fn();
        render(<TaskList tasks={tasks} onToggle={onToggle} />);
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        expect(onToggle).toHaveBeenCalledWith(1);
    });
});
