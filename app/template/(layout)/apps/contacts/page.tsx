import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsContacts from './ComponentsAppsContacts';

export const metadata: Metadata = {
    title: 'Contacts',
};

const Contacts = () => {
    return <ComponentsAppsContacts />;
};

export default Contacts;
