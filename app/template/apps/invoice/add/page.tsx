import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsInvoiceAdd from './ComponentsAppsInvoiceAdd';

export const metadata: Metadata = {
    title: 'Invoice Add',
};

const InvoiceAdd = () => {
    return <ComponentsAppsInvoiceAdd />;
};

export default InvoiceAdd;
