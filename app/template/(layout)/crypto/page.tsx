import { Metadata } from 'next';
import React from 'react';
import ComponentsDashboardCrypto from './ComponentsDashboardCrypto';

export const metadata: Metadata = {
    title: 'Crypto',
};

const Crypto = () => {
    return <ComponentsDashboardCrypto />;
};

export default Crypto;
