import { Metadata } from 'next';
import React from 'react'
import ComponentsDashboardFinance from './_client/ComponentsDashboardFinance';

export const metadata: Metadata = {
    title: 'Finance',
};

const Finance = () => {
  return (
    <ComponentsDashboardFinance />
  )
}

export default Finance
