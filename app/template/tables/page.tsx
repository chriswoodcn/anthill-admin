import { Metadata } from 'next';
import React from 'react';
import ComponentsTablesCaptions from './ComponentsTablesCaptions';
import ComponentsTablesCheckboxes from './ComponentsTablesCheckboxes';
import ComponentsTablesContextual from './ComponentsTablesContextual';
import ComponentsTablesDropdown from './ComponentsTablesDropdown';
import ComponentsTablesFooter from './ComponentsTablesFooter';
import ComponentsTablesHover from './ComponentsTablesHover';
import ComponentsTablesLight from './ComponentsTablesLight';
import ComponentsTablesProgress from './ComponentsTablesProgress';
import ComponentsTablesSimple from './ComponentsTablesSimple';
import ComponentsTablesStripped from './ComponentsTablesStripped';

export const metadata: Metadata = {
    title: 'Tables',
};

const Tables = () => {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Simple */}
            <ComponentsTablesSimple />
            {/* Hover Table  */}
            <ComponentsTablesHover />
            {/* stripped Table  */}
            <ComponentsTablesStripped />
            {/* light Table  */}
            <ComponentsTablesLight />
            {/* captions */}
            <ComponentsTablesCaptions />
            {/* progress */}
            <ComponentsTablesProgress />
            {/* Contextual */}
            <ComponentsTablesContextual />
            {/* dropdown */}
            <ComponentsTablesDropdown />
            {/* footer Table  */}
            <ComponentsTablesFooter />
            {/* checkboxes */}
            <ComponentsTablesCheckboxes />
        </div>
    );
};

export default Tables;
