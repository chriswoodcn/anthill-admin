import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsChartsArea from "./ComponentsChartsArea";
import ComponentsChartsBar from "./ComponentsChartsBar";
import ComponentsChartsBubble from "./ComponentsChartsBubble";
import ComponentsChartsColumn from "./ComponentsChartsColumn";
import ComponentsChartsColumnStacked from "./ComponentsChartsColumnStacked";
import ComponentsChartsDonut from "./ComponentsChartsDonut";
import ComponentsChartsLine from "./ComponentsChartsLine";
import ComponentsChartsMixed from "./ComponentsChartsMixed";
import ComponentsChartsPie from "./ComponentsChartsPie";
import ComponentsChartsPolarArea from "./ComponentsChartsPolarArea";
import ComponentsChartsRadar from "./ComponentsChartsRadar";
import ComponentsChartsRadialBar from "./ComponentsChartsRadialBar";

export const metadata: Metadata = {
  title: "Charts",
};

const Charts = () => {
  return (
    <div>
      <ul className="mb-6 flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Charts</span>
        </li>
      </ul>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary lg:col-span-2">
          <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
            <IconBell />
          </div>
          <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
          <a
            href="https://www.npmjs.com/package/react-apexcharts"
            target="_blank"
            className="block hover:underline"
            rel="noreferrer"
          >
            https://www.npmjs.com/package/react-apexcharts
          </a>
        </div>
        <ComponentsChartsLine />
        <ComponentsChartsArea />
        <ComponentsChartsColumn />
        <ComponentsChartsColumnStacked />
        <ComponentsChartsBar />
        <ComponentsChartsMixed />
        <ComponentsChartsRadar />
        <ComponentsChartsPie />
        <ComponentsChartsDonut />
        <ComponentsChartsPolarArea />
        <ComponentsChartsRadialBar />
        <ComponentsChartsBubble />
      </div>
    </div>
  );
};

export default Charts;
