
import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsMailbox from './ComponentsAppsMailbox';

export const metadata: Metadata = {
    title: 'Mailbox',
};

const Mailbox = () => {
    return <ComponentsAppsMailbox />;
};

export default Mailbox;
