import { ReactNode, useState } from "react";
import Tree, { TreeNode } from "rc-tree";
import "./rc.less";
import { IconChevronDown } from "@tabler/icons-react";
import logger from "@/lib/logger";

interface RcTreeCheckboxProps {
  label?: string;
  withAsterisk?: boolean;
  checkModel?: "leaf" | "all" | undefined;
  data: any[];
  value: any[];
  onChange?: (checkedKeys: any) => void;
  error?: ReactNode;
}
const RcTreeCheckbox = (props: RcTreeCheckboxProps) => {
  let { label, withAsterisk, data, value, onChange, error, checkModel } = props;
  const fieldNames = {
    children: "children",
    title: "label",
    key: "value",
  };
  const switcherIcon = (obj: any) => {
    if (obj.isLeaf) return null;
    return (
      <IconChevronDown
        size={20}
        style={{ transform: obj.expanded ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    );
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
      <Tree
        fieldNames={fieldNames}
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
