import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsInvoiceList from './ComponentsAppsInvoiceList';

export const metadata: Metadata = {
    title: 'Invoice List',
};

const InvoiceList = () => {
    return <ComponentsAppsInvoiceList />;
};

export default InvoiceList;
