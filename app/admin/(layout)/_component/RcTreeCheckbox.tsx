import { ReactNode, useState } from "react";
import Tree from "rc-tree";
import { IconChevronDown } from "@tabler/icons-react";
import "./rc.css";
import logger from "@/lib/logger";
import { FieldNames } from "rc-tree/lib/interface";
import { translate } from "@/lib/client";
import NoData from "./NoData";

interface RcTreeCheckboxProps {
  label?: string;
  withAsterisk?: boolean;
  checkModel?: "leaf" | "all" | undefined;
  trans?: string; //是否JSON翻译
  data: any[];
  value: any[];
  onChange?: (checkedKeys: any) => void;
  error?: ReactNode;
  fieldNames: FieldNames;
}
const RcTreeCheckbox = (props: RcTreeCheckboxProps) => {
  let {
    label,
    withAsterisk,
    trans,
    data,
    value,
    onChange,
    error,
    checkModel,
    fieldNames,
  } = props;
  const finalFieldNames =
    fieldNames == undefined
      ? {
          children: "children",
          title: "label",
          key: "value",
        }
      : fieldNames;
  const switcherIcon = (obj: any) => {
    if (obj.isLeaf) return null;
    return (
      <IconChevronDown
        size={20}
        style={{ transform: obj.expanded ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    );
  };
  const getRealTitle = (item: any) => {
    const title = item[finalFieldNames.title!!];
    if (!title) return "--";
    if (trans) return translate(title);
    return title;
  };

  return (
    <>
      {label && (
        <label
          className={`text-sm ltr:mr-2 rtl:ml-2 mb-2 min-w-24 ${
            withAsterisk ? "form-required" : ""
          }`}
        >
          {label}
        </label>
      )}
      {!data || data.length == 0 ? (
        <NoData />
      ) : (
        <Tree
          checkable
          checkStrictly
          selectable={false}
          switcherIcon={switcherIcon}
          defaultExpandParent
          autoExpandParent
          onExpand={(expandedKeys) => {
            logger.debug(expandedKeys);
          }}
          defaultCheckedKeys={value}
          onCheck={(checkedKeys, info) => {
            const keys = checkedKeys as any;
            logger.debug("checkedKeys", keys);
            onChange && onChange(keys.checked);
          }}
          treeData={data}
          titleRender={(node) => getRealTitle(node)}
          showIcon={false}
        ></Tree>
      )}
      {error && <div className="text-danger text-xs mt-1">{error}</div>}
    </>
  );
};
export default RcTreeCheckbox;
