'use client';

import React from 'react';
import Select from 'react-select';
import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';

const ComponentsFormsSelectMultiselect = () => {
    const options5 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    return (
        <PanelCodeHighlight
            title="Multiple select"
            codeHighlight={`import Select from 'react-select';

const options5 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];

<Select placeholder="Select an option" options={options5} isMulti isSearchable={false}/>`}
        >
            <div className="mb-5">
                <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
            </div>
        </PanelCodeHighlight>
    );
};

export default ComponentsFormsSelectMultiselect;
