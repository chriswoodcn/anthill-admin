import { ReactNode, useState } from "react";
import Tree, { TreeNode } from "rc-tree";
import { IconChevronDown } from "@tabler/icons-react";
import "./rc.css";
import logger from "@/lib/logger";
import { FieldNames } from "rc-tree/lib/interface";
import { translate } from "@/lib/client";

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

  const renderTitle = (title: any) => (trans ? translate(title) : title);
  const groupList = (list: any[], targetVar: any) => {
    const obj: any = {};
    list.forEach((item) => {
      if (!obj[item.fieldType]) {
        obj[item.fieldType] = [];
      }
      const disabled = item.is_key === 1 || item.ti === targetVar;
      obj[item.fieldType].push({
        ...item,
        disabled,
      });
    });
    return (
      Object.keys(obj)
        .map((key) => ({
          title: key,
          key,
          children: obj[key],
        }))
        .filter(({ children }) => children.length) || []
    );
  };

  function getTreeData() {
    return groupList(
      data.map((item) => ({
        title: () => renderTitle(item.fieldName),
        key: item.fieldName,
        checkable: true,
        ...item,
      })),
      "id",
      []
    );
  }

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
      <Tree
        fieldNames={finalFieldNames}
        checkable
        checkStrictly
        selectable={false}
        switcherIcon={switcherIcon}
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
        showIcon={false}
      />
      {error && <div className="text-danger text-xs mt-1">{error}</div>}
    </>
  );
};
export default RcTreeCheckbox;
