import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";
import ComponentsDatatablesExport from "./ComponentsDatatablesExport";

export const metadata: Metadata = {
  title: "Export Table",
};

const Export = () => {
  return (
    <div>
      <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
        <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
          <IconBell />
        </div>
        <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
        <a
          href="https://www.npmjs.com/package/mantine-datatable"
          target="_blank"
          className="block hover:underline"
          rel="noreferrer"
        >
          https://www.npmjs.com/package/mantine-datatable
        </a>
      </div>
      <ComponentsDatatablesExport />
    </div>
  );
};

export default Export;
