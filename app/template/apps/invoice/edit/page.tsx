import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsInvoiceEdit from './ComponentsAppsInvoiceEdit';

export const metadata: Metadata = {
    title: 'Invoice Edit',
};

const InvoiceEdit = () => {
    return <ComponentsAppsInvoiceEdit />;
};

export default InvoiceEdit;
