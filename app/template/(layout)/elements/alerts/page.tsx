import Link from 'next/link';
import { Metadata } from 'next';
import ElementsAlertsDefault from './ElementsAlertsDefault';
import ElementsAlertsOutline from './ElementsAlertsOutline';
import ElementsAlertsSolid from './ElementsAlertsSolid';
import ElementsAlertsCustom from './ElementsAlertsCustom';
import ElementsAlertsWithIcon from './ElementsAlertsWithIcon';
import ElementsAlertsArrowed from './ElementsAlertsArrowed';

export const metadata: Metadata = {
    title: 'Alerts',
};

const Alerts = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/elements/alerts" className="text-primary hover:underline">
                        Elements
                    </Link>
                </li>
                <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
                    <span>Alerts</span>
                </li>
            </ul>
            <div className="space-y-8 pt-5">
                <ElementsAlertsDefault />
                <ElementsAlertsOutline />
                <ElementsAlertsSolid />
                <ElementsAlertsWithIcon />
                <ElementsAlertsArrowed />
                <ElementsAlertsCustom />
            </div>
        </div>
    );
};

export default Alerts;
