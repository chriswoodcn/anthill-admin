import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsCalendar from './ComponentsAppsCalendar';

export const metadata: Metadata = {
    title: 'Calendar',
};

const Calendar = () => {
    return <ComponentsAppsCalendar />;
};

export default Calendar;
