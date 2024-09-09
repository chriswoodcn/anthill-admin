import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import ComponentsFormsInputGroupButtonAddons from './ComponentsFormsInputGroupButtonAddons';
import ComponentsFormsInputGroupButtonsWithDropdowns from './ComponentsFormsInputGroupButtonsWithDropdowns';
import ComponentsFormsInputGroupCheckboxes from './ComponentsFormsInputGroupCheckboxes';
import ComponentsFormsInputGroupDefault from './ComponentsFormsInputGroupDefault';
import ComponentsFormsInputGroupDropdownIcon from './ComponentsFormsInputGroupDropdownIcon';
import ComponentsFormsInputGroupMultipleAddons from './ComponentsFormsInputGroupMultipleAddons';
import ComponentsFormsInputGroupMultipleInputs from './ComponentsFormsInputGroupMultipleInputs';
import ComponentsFormsInputGroupRadio from './ComponentsFormsInputGroupRadio';
import ComponentsFormsInputGroupSegmentedButtons from './ComponentsFormsInputGroupSegmentedButtons';
import ComponentsFormsInputGroupSimpleIcon from './ComponentsFormsInputGroupSimpleIcon';
import ComponentsFormsInputGroupSizes from './ComponentsFormsInputGroupSizes';
import ComponentsFormsInputGroupSpinningIcon from './ComponentsFormsInputGroupSpinningIcon';
import ComponentsFormsInputGroupSwitch from './ComponentsFormsInputGroupSwitch';

export const metadata: Metadata = {
    title: 'Input Group',
};

const InputGroup = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
                    <span>Input Group</span>
                </li>
            </ul>

            <div className="space-y-4 pt-5">
                {/*  Basic  */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2" id="basic">
                    {/* default */}
                    <ComponentsFormsInputGroupDefault />

                    {/* simple icon */}
                    <ComponentsFormsInputGroupSimpleIcon />

                    {/*  spinning Icon  */}
                    <ComponentsFormsInputGroupSpinningIcon />

                    {/*  dropdown icon */}
                    <ComponentsFormsInputGroupDropdownIcon />

                    {/* checkboxes */}
                    <ComponentsFormsInputGroupCheckboxes />

                    {/* Radio */}
                    <ComponentsFormsInputGroupRadio />

                    {/* switch */}
                    <ComponentsFormsInputGroupSwitch />
                </div>

                {/* Sizes */}
                <ComponentsFormsInputGroupSizes />

                {/* <!-- Multiple --> */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2" id="multiple">
                    {/* Multiple inputs */}
                    <ComponentsFormsInputGroupMultipleInputs />

                    {/* Multiple addons */}
                    <ComponentsFormsInputGroupMultipleAddons />
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2" id="with_action">
                    {/* Buttons with dropdowns */}
                    <ComponentsFormsInputGroupButtonsWithDropdowns />

                    {/* Segmented buttons */}
                    <ComponentsFormsInputGroupSegmentedButtons />

                    {/* Button addons */}
                    <ComponentsFormsInputGroupButtonAddons />
                </div>
            </div>
        </div>
    );
};

export default InputGroup;
