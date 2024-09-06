"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { useCopyToClipboard } from "react-use";

import { IconCopy } from "@tabler/icons-react";
import CodeHighlight from "../core/CodeHighlight";
import IconCode from "../icon/icon-code";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import Tippy from "@tippyjs/react";

interface PanelCodeHighlightProps {
  children: ReactNode;
  title?: string;
  codeHighlight?: string;
  id?: string;
  className?: string;
}

const PanelCodeHighlight = ({
  children,
  title,
  codeHighlight,
  id,
  className = "",
}: PanelCodeHighlightProps) => {
  const [toggleCode, setToggleCode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tipContent, setTipContent] = useState("");
  const [state, copyToClipboard] = useCopyToClipboard();

  useEffectOnce(() => {
    if (state.error == undefined) {
      setTipContent("Copied");
      setVisible(true);
    } else {
      setTipContent(state.error!!.message);
      setVisible(true);
    }
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, [state]);
  return (
    <div className={`panel ${className}`} id={id}>
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-7">{title}</h5>
        <button
          type="button"
          className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
          onClick={() => setToggleCode(!toggleCode)}
        >
          <span className="flex items-center">
            <IconCode className="me-2" />
            Code
          </span>
        </button>
      </div>
      {children}
      {toggleCode && (
        <CodeHighlight>
          <Tippy
            // className="bg-black-8 p-1 rounded-lg"
            content={tipContent}
            visible={visible}
            placement="bottom-end"
            onClickOutside={() => setVisible(false)}
          >
            <div
              className="w-5 h-5 flex justify-center items-center absolute right-2 top-2 cursor-pointer active:opacity-50 z-10"
              onClick={() => {
                if (codeHighlight) copyToClipboard(codeHighlight);
              }}
            >
              <IconCopy size={20} stroke={2} className="stroke-white-4" />
            </div>
          </Tippy>
          <pre className="language-xml overflow-scroll p-5">
            {codeHighlight}
          </pre>
        </CodeHighlight>
      )}
    </div>
  );
};

export default PanelCodeHighlight;
