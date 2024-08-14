import { Metadata } from 'next';
import React from 'react';
import ComponentsDashboardAnalytics from './_client/ComponentsDashboardAnalytics';

export const metadata: Metadata = {
    title: 'Analytics Admin',
};

const Analytics = () => {
    return <ComponentsDashboardAnalytics />;
};

export default Analytics;
