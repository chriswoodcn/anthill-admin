import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsTodoList from './ComponentsAppsTodoList';

export const metadata: Metadata = {
    title: 'TodoList',
};

const TodoList = () => {
    return <ComponentsAppsTodoList />;
};

export default TodoList;
