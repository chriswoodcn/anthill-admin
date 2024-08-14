import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsChat from './_client/ComponentsAppsChat';

export const metadata: Metadata = {
    title: 'Chat',
};

const Chat = () => {
    return <ComponentsAppsChat />;
};

export default Chat;
