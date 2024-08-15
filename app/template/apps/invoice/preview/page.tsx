import { Metadata } from 'next';
import React from 'react';
import ComponentsAppsInvoicePreview from './ComponentsAppsInvoicePreview';

export const metadata: Metadata = {
    title: 'Invoice Preview',
};

const InvoicePreview = () => {
    return <ComponentsAppsInvoicePreview />;
};

export default InvoicePreview;
