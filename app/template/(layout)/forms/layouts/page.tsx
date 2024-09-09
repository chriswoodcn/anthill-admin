import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import ComponentsFormsLayoutsActionsButtons from './ComponentsFormsLayoutsActionsButtons';
import ComponentsFormsLayoutsAutoSizing from './ComponentsFormsLayoutsAutoSizing';
import ComponentsFormsLayoutsGrid from './ComponentsFormsLayoutsGrid';
import ComponentsFormsLayoutsHorizontal from './ComponentsFormsLayoutsHorizontal';
import ComponentsFormsLayoutsInline from './ComponentsFormsLayoutsInline';
import ComponentsFormsLayoutsLogin from './ComponentsFormsLayoutsLogin';
import ComponentsFormsLayoutsRegistration from './ComponentsFormsLayoutsRegistration';
import ComponentsFormsLayoutsStack from './ComponentsFormsLayoutsStack';

export const metadata: Metadata = {
    title: 'Layouts',
};

const Layouts = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
                    <span>Layouts</span>
                </li>
            </ul>

            <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                {/* Stack */}
                <ComponentsFormsLayoutsStack />

                {/* Horizontal */}
                <ComponentsFormsLayoutsHorizontal />

                {/* Registration */}
                <ComponentsFormsLayoutsRegistration />

                {/* Login */}
                <ComponentsFormsLayoutsLogin />

                {/* Grid */}
                <ComponentsFormsLayoutsGrid />

                {/* Inline */}
                <ComponentsFormsLayoutsInline />

                {/* Auto-sizing */}
                <ComponentsFormsLayoutsAutoSizing />

                {/* Actions Buttons */}
                <ComponentsFormsLayoutsActionsButtons />
            </div>
        </div>
    );
};

export default Layouts;
