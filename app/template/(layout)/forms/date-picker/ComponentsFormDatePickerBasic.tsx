"use client";

import { RootState } from "@/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import PanelCodeHighlight from "@/components/compose/PanelCodeHighlight";

const ComponentsFormDatePickerBasic = () => {
  const isRtl =
    useSelector((state: RootState) => state.adminSetting.rtlClass) === "rtl";
  const [date1, setDate1] = useState<any>("2022-07-05");

  return (
    <PanelCodeHighlight
      title="Basic"
      codeHighlight={`import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {  useSelector } from 'react-redux';

const isRtl = useSelector((state: RootState) => state.themeConfig.rtlClass) === 'rtl';
const [date1, setDate1] = useState<any>('2022-07-05');

<Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />`}
    >
      <div className="mb-5">
        <Flatpickr
          value={date1}
          options={{
            dateFormat: "Y-m-d",
            position: isRtl ? "auto right" : "auto left",
          }}
          className="form-input"
          onChange={(date) => setDate1(date)}
        />
      </div>
    </PanelCodeHighlight>
  );
};

export default ComponentsFormDatePickerBasic;
