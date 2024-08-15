import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsNotes from './ComponentsAppsNotes';

export const metadata: Metadata = {
    title: 'Notes',
};

const Notes = () => {
    return <ComponentsAppsNotes />;
};

export default Notes;
