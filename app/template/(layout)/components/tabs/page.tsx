import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';

import IconBell from '@/components/icon/icon-bell';
import ComponentsTabsSimple from './ComponentsTabsSimple';
import ComponentsTabsSimplePills from './ComponentsTabsSimplePills';
import ComponentsTabsIcon from './ComponentsTabsIcon';
import ComponentsTabsIconPills from './ComponentsTabsIconPills';
import ComponentsTabsVerticalBordered from './ComponentsTabsVerticalBordered';
import ComponentsTabsBorder from './ComponentsTabsBorder';
import ComponentsTabsBorderTop from './ComponentsTabsBorderTop';
import ComponentsTabsLine from './ComponentsTabsLine';
import ComponentsTabsAnimatedLine from './ComponentsTabsAnimatedLine';
import ComponentsTabsVerticalLine from './ComponentsTabsVerticalLine';
import ComponentsTabsJustify from './ComponentsTabsJustify';
import ComponentsTabsJustifyPills from './ComponentsTabsJustifyPills';
import ComponentsTabsJustifyCenter from './ComponentsTabsJustifyCenter';
import ComponentsTabsJustifyCenterPills from './ComponentsTabsJustifyCenterPills';
import ComponentsTabsJustifyRight from './ComponentsTabsJustifyRight';
import ComponentsTabsJustifyRightPills from './ComponentsTabsJustifyRightPills';
import ComponentsTabsPillsWithIcon from './ComponentsTabsPillsWithIcon';
import ComponentsTabsRoundedPillWithIcon from './ComponentsTabsRoundedPillWithIcon';
import ComponentsTabsVerticalRoundedWithIcon from './ComponentsTabsVerticalRoundedWithIcon';
import ComponentsTabsVerticalCircleWithIcon from './ComponentsTabsVerticalCircleWithIcon';
import ComponentsTabsVerticalPills from './ComponentsTabsVerticalPills';
import ComponentsTabsJustifyVerticalPillsRight from './ComponentsTabsJustifyVerticalPillsRight';

export const metadata: Metadata = {
    title: 'Tabs',
};

const Tab = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/components/tabs" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
                    <span>Tabs</span>
                </li>
            </ul>
            <div className="space-y-8 pt-5">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                    <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                        <IconBell />
                    </div>
                    <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                    <a href="https://headlessui.com/react/tabs" target="_blank" className="block hover:underline" rel="noreferrer">
                        https://headlessui.com/react/tabs
                    </a>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ComponentsTabsSimple />
                    <ComponentsTabsSimplePills />
                    <ComponentsTabsIcon />
                    <ComponentsTabsIconPills />
                    <ComponentsTabsVerticalBordered />
                    <ComponentsTabsBorder />
                    <ComponentsTabsBorderTop />
                    <ComponentsTabsLine />
                    <ComponentsTabsAnimatedLine />
                    <ComponentsTabsVerticalLine />
                    <ComponentsTabsJustify />
                    <ComponentsTabsJustifyPills />
                    <ComponentsTabsJustifyCenter />
                    <ComponentsTabsJustifyCenterPills />
                    <ComponentsTabsJustifyRight />
                    <ComponentsTabsJustifyRightPills />
                    <ComponentsTabsPillsWithIcon />
                    <ComponentsTabsRoundedPillWithIcon />
                    <ComponentsTabsVerticalRoundedWithIcon />
                    <ComponentsTabsVerticalCircleWithIcon />
                    <ComponentsTabsVerticalPills />
                    <ComponentsTabsJustifyVerticalPillsRight />
                </div>
            </div>
        </div>
    );
};

export default Tab;
