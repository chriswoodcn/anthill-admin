'use client';

import Select from 'react-select';
import React from 'react';
import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';

const ComponentsFormsSelectDisablingOptions = () => {
    const options2 = [
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White', isDisabled: 'option--is-disabled' },
        { value: 'purple', label: 'Purple' },
    ];

    return (
        <PanelCodeHighlight
            title="Disabling options"
            codeHighlight={`import Select from 'react-select';

const options2 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White', isDisabled: 'option--is-disabled' },
    { value: 'purple', label: 'Purple' },
];

<Select defaultValue={options2[0]} options={options2} isSearchable={false}/>`}
        >
            <div className="mb-5">
                <Select defaultValue={options2[0]} options={options2} isSearchable={false} />
            </div>
        </PanelCodeHighlight>
    );
};

export default ComponentsFormsSelectDisablingOptions;
