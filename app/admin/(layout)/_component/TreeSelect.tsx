"use client";

import Icon from "@/components/icon";
import { Combobox, useCombobox, InputBase, Input } from "@mantine/core";
import { useState, ReactNode, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { useImmer } from "use-immer";
import { translate } from "@/lib/client";

interface TreeSelectProps {
  data?: any[];
  nameAlias?: string;
  trans?: string; //是否JSON翻译
  valueAlias?: string;
  childrenAlias?: string;
  parentValueAlias?: string;
  placeholder?: string;
  label?: ReactNode;
  withAsterisk?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  error?: ReactNode;
}

const groceries = [
  {
    name: "a",
    value: "a",
    children: [
      {
        parentValue: "a",
        name: "a-1",
        value: "a-1",
        children: [
          { name: "a-1-1", value: "a-1-1", parentValue: "a-1" },
          { name: "a-1-2", value: "a-1-2", parentValue: "a-1" },
        ],
      },
      { name: "a-2", value: "a-2", parentValue: "a" },
    ],
  },
  {
    name: "b",
    value: "b",
    children: [
      { name: "b-1", value: "b-1", parentValue: "b" },
      { name: "b-2", value: "b-2", parentValue: "b" },
      { name: "b-3", value: "b-3", parentValue: "b" },
    ],
  },
];
const TreeSelect = (props: TreeSelectProps) => {
  const {
    data = groceries,
    nameAlias,
    trans,
    valueAlias,
    childrenAlias,
    parentValueAlias,
    placeholder,
    label,
    withAsterisk,
    value,
    onChange,
    error,
  } = props;
  const getItemName = (item: any) => {
    if (trans) {
      return nameAlias ? translate(item[nameAlias]) : translate(item["name"]);
    } else {
      return nameAlias ? item[nameAlias] : item["name"];
    }
  };
  const getItemValue = (item: any) => {
    return valueAlias ? item[valueAlias] : item["value"];
  };
  const getItemChildren: (item: any) => any[] | undefined = (item: any) => {
    return childrenAlias ? item[childrenAlias] : item["children"];
  };
  const setItemChildren = (item: any, val: any) => {
    let target = childrenAlias ? item[childrenAlias] : item["children"];
    if (target) target = val;
  };
  const getItemParentValue = (item: any) => {
    return parentValueAlias ? item[parentValueAlias] : item["parentValue"];
  };
  const genFlatedOptions = (
    arr: any[] | undefined = data,
    reduced: any[] | undefined = []
  ) => {
    arr.forEach((a) => {
      if (getItemChildren(a) && getItemChildren(a)!.length > 0) {
        genFlatedOptions(getItemChildren(a), reduced);
        setItemChildren(a, undefined);
      }
      reduced.push(a);
    });
    return reduced;
  };
  const [flatedOptions, setFlatedOptions] = useState<any[]>(genFlatedOptions());
  const [selectedValue, setSelectedValue] = useState<any>(undefined);
  const getDispalyName = () => {
    const find = flatedOptions.find(
      (item) => getItemValue(item) == selectedValue
    );
    return find ? getItemName(find) : undefined;
  };
  //初次加载需要展开选中的节点
  useEffect(() => {
    setSelectedValue(value);
  }, []);
  useEffect(() => {
    const options = genFlatedOptions(data);
    setFlatedOptions(options);
  }, [data]);
  useEffect(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);
  const combobox = useCombobox({
    onDropdownClose(eventSource) {
      combobox.resetSelectedOption();
    },
  });
  const genExpandedIds = () => {
    const idx = flatedOptions.findIndex(
      (item) => getItemValue(item) == selectedValue
    );
    if (idx > -1) {
      let node = flatedOptions[idx];
      const nodes = [node];
      while (node && getItemParentValue(node) != undefined) {
        node = flatedOptions.find(
          (item) => getItemValue(item) == getItemParentValue(node)
        );
        nodes.unshift(node);
      }
      return nodes.map((n) => getItemValue(n));
    }
    return [];
  };
  const [expandedIds, updateExpandedIds] = useImmer<any[]>(genExpandedIds());
  const toggleExpandedIds = (id: any) => {
    const idx = expandedIds.findIndex((item) => item == id);
    if (idx > -1) {
      updateExpandedIds((ids) => (ids = ids.filter((d) => d != id)));
    } else {
      updateExpandedIds((ids) => (ids = [...ids, id]));
    }
  };

  //组装嵌套的options
  const nestedOptions = (arr: any[] = data) => {
    return arr.map((item) => {
      return (
        <div key={getItemValue(item)}>
          <button
            type="button"
            className="w-full flex justify-start items-center"
          >
            {getItemChildren(item) && getItemChildren(item)!.length ? (
              <span
                className="flex justify-center items-center w-4 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandedIds(getItemValue(item));
                }}
              >
                <Icon
                  name="caret-down"
                  className={`transition-all duration-300 ${
                    expandedIds.includes(getItemValue(item))
                      ? ""
                      : "rtl:rotate-90 -rotate-90"
                  }`}
                />
              </span>
            ) : (
              <span className="w-4"></span>
            )}
            <Combobox.Option
              value={getItemValue(item)}
              key={getItemValue(item)}
              active={getItemValue(item) == selectedValue}
              className="flex-1 flex justify-start space-x-2"
            >
              <span className="flex justify-center items-center w-4 text-primary">
                {getItemChildren(item) && getItemChildren(item)!.length ? (
                  <Icon name="folder" />
                ) : (
                  <Icon name="box" />
                )}
              </span>
              <span>{getItemName(item)}</span>
            </Combobox.Option>
          </button>
          {getItemChildren(item) && getItemChildren(item)!.length > 0 && (
            <AnimateHeight
              duration={300}
              height={expandedIds.includes(getItemValue(item)) ? "auto" : 0}
            >
              <ul className="ltr:pl-2 rtl:pr-2 ltr:sm:pl-6 rtl:sm:pr-6">
                {nestedOptions(getItemChildren(item))}
              </ul>
            </AnimateHeight>
          )}
        </div>
      );
    });
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSelectedValue(val);
        combobox.closeDropdown();
      }}
    >
      {label && (
        <Combobox.Header className="mb-2 border-none text-black-7 dark:text-white-7">
          {label}
          {withAsterisk && <span className="text-red-600">&nbsp;*</span>}
        </Combobox.Header>
      )}
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          rightSection={
            selectedValue ? (
              <Combobox.ClearButton
                onClear={() => setSelectedValue(undefined)}
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          rightSectionPointerEvents="all"
          onClick={() => {
            combobox.toggleDropdown();
            updateExpandedIds((ids) => (ids = genExpandedIds()));
            if (selectedValue) combobox.selectActiveOption();
          }}
        >
          {getDispalyName() ||
            (placeholder ? (
              <Input.Placeholder>{placeholder}</Input.Placeholder>
            ) : (
              ""
            ))}
        </InputBase>
      </Combobox.Target>

      <Combobox.Footer>
        {typeof error == "string" ? (
          <span className="text-red-600">{error}</span>
        ) : (
          error
        )}
      </Combobox.Footer>
      <Combobox.Dropdown className="!z-[1099] shadow-lg rounded overflow-y-scroll max-h-72 sm:max-h-96">
        <Combobox.Options>{nestedOptions()}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
export default TreeSelect;
