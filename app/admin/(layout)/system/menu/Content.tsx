"use client";

import { useTranslation } from "react-i18next";
import { WithPermissions } from "@/components/compose/WithPermissions";
import { useState } from "react";
import {
  SystemDictApi,
  SystemMenuApi,
  SystemDictDataApi,
} from "@/lib/hooks/admin/adminApi";
import {
  DataTable,
  DataTableColumn,
  DataTableRowExpansionProps,
} from "mantine-datatable";
import { translate } from "@/lib/client";
import Icon from "@/components/icon/index";
import logger from "@/lib/logger";
import { datatableColumnText } from "@/lib/support/datatableSupport";
import { dictVal2Label } from "@/lib";
import EditDialog from "../../_component/EditDialog";
import { useFormik } from "formik";
import Yup from "@/lib/validation";
import { useImmer } from "use-immer";
import { JsonInput, NumberInput, TextInput } from "@mantine/core";
import TreeSelect from "../../_component/TreeSelect";
import Toast from "@/lib/toast";
import useEffectOnce from "@/lib/hooks/useEffectOnce";

export default function () {
  const { t } = useTranslation("admin_system_menu");
  const { t: ct } = useTranslation("admin_common");

  const { data: remoteDictSysStatus } = SystemDictApi.useDict(
    {
      type: "sys_status",
    },
    {
      filter: (records: any[]) => {
        if (records.length > 0) {
          if (records[0].dictType == "sys_status") {
            return records.filter((r) => r.dictValue != "2");
          }
        }
        return records;
      },
    }
  );
  const { data: remoteDictSysAffiliate } = SystemDictApi.useDict({
    type: "sys_affiliate",
  });
  const { data: remoteDictSysYesNo } = SystemDictApi.useDict({
    type: "sys_yes_no",
  });
  const { data: remoteDictSysMenuType } = SystemDictApi.useDict({
    type: "sys_menu_type",
  });
  const { data: treeSelectData } = SystemMenuApi.useSelect({
    root: "1",
  });

  //#region dialog
  const [show, setShow] = useState(false);
  const initialForm = {
    id: undefined,
    menuType: "M",
    menuNameJson: undefined,
    parentId: undefined,
    orderNum: 0,
    path: undefined,
    menuKey: undefined,
    status: "0",
    perms: undefined,
    icon: "#",
    remarkJson: undefined,
    menuVersion: undefined,
    hiddenFlag: "0",
    frameFlag: "0",
    affiliateFlag: "0",
    version: undefined,
  };
  const [form, updateForm] = useImmer<Record<string, any>>(initialForm);
  const formikDialog = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      menuNameJson: Yup.string()
        .required()
        .test({
          name: "json",
          message: t("validation_error.field_json_invalid"),
          test: (val) => {
            try {
              if (!val || val.replace(/\s/g, "") == "{}") return false;
              JSON.parse(val);
              return true;
            } catch (error) {
              return false;
            }
          },
        }),
      parentId: Yup.number().required(),
      remarkJson: Yup.string()
        .nullable()
        .test({
          name: "json",
          message: t("validation_error.field_json_invalid"),
          test: (val) => {
            try {
              if (val) JSON.parse(val);
              return true;
            } catch (error) {
              return false;
            }
          },
        }),
      path: Yup.string()
        .nullable()
        .test({
          name: "required",
          message: ct("validation_error.field_required"),
          test: (val, ctx) => {
            const menuType = ctx.parent.menuType;
            console.log(ctx.parent);
            if (menuType == "C") {
              return !!val;
            }
            return true;
          },
        })
        .test({
          name: "invalid",
          message: ct("validation_error.field_invalid"),
          test: (val, ctx) => {
            const menuType = ctx.parent.menuType;
            if (menuType != "C") return true;
            const frameFlag = ctx.parent.frameFlag;
            if (!val) return false;
            if (frameFlag == "1" && val) {
              return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
                val
              );
            }
            return true;
          },
        }),
      menuKey: Yup.string()
        .nullable()
        .test({
          name: "required",
          message: ct("validation_error.field_required"),
          test: (val, ctx) => {
            const menuType = ctx.parent.menuType;
            if (menuType != "F") {
              return !!val;
            }
            return true;
          },
        }),
      perms: Yup.string()
        .nullable()
        .test({
          name: "required",
          message: ct("validation_error.field_required"),
          test: (val, ctx) => {
            const menuType = ctx.parent.menuType;
            if (menuType != "M") {
              return !!val;
            }
            return true;
          },
        }),
    }),
    onSubmit: async (values) => {
      logger.debug("onSubmit values", values);
      await handleSubmitDialog();
    },
    onReset: async (values) => {
      formikDialog.setErrors({});
      formikDialog.setValues(initialForm, false);
      updateForm((form) => (form = initialForm));
    },
  });
  useEffectOnce(() => {
    formikDialog.setErrors({});
  }, [formikDialog.values.menuType]);
  const handleSubmitDialog = async () => {
    let result;
    switch (dialogType) {
      case 3:
        result = await SystemMenuApi.add(formikDialog.values);
        break;
      case 4:
        result = await SystemMenuApi.update(formikDialog.values);
        break;
    }
    if (result) {
      closeDialog();
      pageDataMutate();
    }
    formikDialog.setSubmitting(false);
  };

  const [dialogType, setDialogType] = useState(-1);
  const dialogType2Title = () => {
    switch (dialogType) {
      case 1:
        return ct("outline");
      case 2:
        return ct("detail");
      case 3:
        return ct("add");
      case 4:
        return ct("update");
      default:
        return null;
    }
  };
  const openDialog = async (
    type: number | undefined = 0,
    formId: number | string | undefined = undefined
  ) => {
    setDialogType(type);
    if (type == 3) {
      setShow(true);
      return;
    }
    if (formId == undefined) return;
    const r0 = await SystemMenuApi.getById(formId);
    if (r0) {
      for (const key in initialForm) {
        if (Object.prototype.hasOwnProperty.call(initialForm, key)) {
          formikDialog.setFieldValue(key, r0[key], false);
        }
      }
    }
    setShow(true);
  };
  const closeDialog = () => {
    formikDialog.resetForm();
    updateForm((form) => (form = initialForm));
    setShow(false);
  };
  const PageDialog = (
    <>
      {/* title */}
      <div className="flex bg-white-9 dark:bg-black-8 items-center justify-center px-5 py-3">
        <h5 className="font-bold text-lg text-center">{dialogType2Title()}</h5>
      </div>
      <div className="p-4 sm:p-6 lg:p-10">
        {/* form */}
        <form className="space-y-2" onSubmit={formikDialog.handleSubmit}>
          {/* 上级菜单 */}
          <div
            className={`${
              formikDialog.errors.parentId ? "has-error" : ""
            } min-w-60`}
          >
            <TreeSelect
              withAsterisk
              label={t("parent_menu")}
              placeholder={ct("placeholder_select") + t("parent_menu")}
              data={treeSelectData}
              valueAlias="id"
              nameAlias="menuNameJson"
              trans="true"
              parentValueAlias="parentId"
              value={formikDialog.values.parentId || 0}
              onChange={(val) => {
                formikDialog.setFieldError("parentId", undefined);
                formikDialog.setFieldValue("parentId", val, false);
              }}
              error={
                formikDialog.errors.parentId
                  ? (formikDialog.errors.parentId as string)
                  : ""
              }
            />
          </div>
          {/* 菜单类型 */}
          <div className="min-w-60">
            <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
              {t("type")}
            </label>
            <div className="text-sm">
              {remoteDictSysMenuType.map((item: any) => {
                return (
                  <label className="inline-flex mr-4" key={item.value}>
                    <input
                      type="radio"
                      name="type"
                      className="form-radio"
                      checked={item.value == formikDialog.values.menuType}
                      onChange={() =>
                        formikDialog.setFieldValue(
                          "menuType",
                          item.value,
                          false
                        )
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* 名称 */}
          <div
            className={`${
              formikDialog.errors.menuNameJson ? "has-error" : ""
            } min-w-60`}
          >
            <JsonInput
              withAsterisk
              label={t("name")}
              placeholder={ct("placeholder_input") + t("name")}
              description={ct("description_json_input")}
              value={formikDialog.values.menuNameJson || ""}
              onChange={(val) => {
                formikDialog.setFieldError("menuNameJson", undefined);
                formikDialog.setFieldValue("menuNameJson", val, false);
              }}
              error={
                formikDialog.errors.menuNameJson
                  ? (formikDialog.errors.menuNameJson as string)
                  : ""
              }
              rightSection={
                formikDialog.values.menuNameJson && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue(
                        "menuNameJson",
                        undefined,
                        false
                      )
                    }
                  />
                )
              }
              autosize
              formatOnBlur
            />
          </div>
          {/* 键 */}
          {formikDialog.values.menuType != "F" && (
            <div
              className={`${
                formikDialog.errors.menuKey ? "has-error" : ""
              } min-w-60`}
            >
              <TextInput
                withAsterisk
                label={t("key")}
                placeholder={ct("placeholder_input") + t("key")}
                value={formikDialog.values.menuKey}
                onChange={(e) => {
                  formikDialog.setFieldError("menuKey", undefined);
                  formikDialog.setFieldValue(
                    "menuKey",
                    e.currentTarget.value,
                    false
                  );
                }}
                error={
                  formikDialog.errors.menuKey
                    ? (formikDialog.errors.menuKey as string)
                    : ""
                }
                rightSection={
                  formikDialog.values.menuKey && (
                    <Icon
                      name="x-circle"
                      onClick={(e) =>
                        formikDialog.setFieldValue("menuKey", undefined, false)
                      }
                    />
                  )
                }
              />
            </div>
          )}
          {/* 权限标识 */}
          {formikDialog.values.menuType != "M" && (
            <div
              className={`${
                formikDialog.errors.perms ? "has-error" : ""
              } min-w-60`}
            >
              <TextInput
                withAsterisk
                label={t("perms")}
                placeholder={ct("placeholder_input") + t("perms")}
                value={formikDialog.values.perms || ""}
                onChange={(e) => {
                  formikDialog.setFieldError("perms", undefined);
                  formikDialog.setFieldValue(
                    "perms",
                    e.currentTarget.value,
                    false
                  );
                }}
                error={
                  formikDialog.errors.perms
                    ? (formikDialog.errors.perms as string)
                    : ""
                }
                rightSection={
                  formikDialog.values.perms && (
                    <Icon
                      name="x-circle"
                      onClick={(e) =>
                        formikDialog.setFieldValue("perms", undefined, false)
                      }
                    />
                  )
                }
              />
            </div>
          )}
          {/* 是否链接 */}
          {formikDialog.values.menuType == "C" && (
            <div className="min-w-60">
              <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
                {t("frame_flag")}
              </label>
              <div className="text-sm">
                {remoteDictSysYesNo.map((item: any) => {
                  return (
                    <label className="inline-flex mr-4" key={item.value}>
                      <input
                        type="radio"
                        name="frameFlag"
                        className="form-radio"
                        checked={item.value == formikDialog.values.frameFlag}
                        onChange={() =>
                          formikDialog.setFieldValue(
                            "frameFlag",
                            item.value,
                            false
                          )
                        }
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          {/* 菜单路径 */}
          {formikDialog.values.menuType == "C" && (
            <div
              className={`${
                formikDialog.errors.path ? "has-error" : ""
              } min-w-60`}
            >
              <TextInput
                withAsterisk
                label={t("path")}
                placeholder={ct("placeholder_input") + t("path")}
                value={formikDialog.values.path}
                onChange={(e) => {
                  formikDialog.setFieldError("path", undefined);
                  formikDialog.setFieldValue(
                    "path",
                    e.currentTarget.value,
                    false
                  );
                }}
                error={
                  formikDialog.errors.path
                    ? (formikDialog.errors.path as string)
                    : ""
                }
                rightSection={
                  formikDialog.values.path && (
                    <Icon
                      name="x-circle"
                      onClick={(e) =>
                        formikDialog.setFieldValue("path", undefined, false)
                      }
                    />
                  )
                }
              />
            </div>
          )}
          {/* 图标 */}
          {formikDialog.values.menuType == "C" && (
            <div
              className={`${
                formikDialog.errors.icon ? "has-error" : ""
              } min-w-60`}
            >
              <TextInput
                label={t("icon")}
                placeholder={ct("placeholder_input") + t("icon")}
                value={formikDialog.values.icon}
                onChange={(e) => {
                  formikDialog.setFieldError("icon", undefined);
                  formikDialog.setFieldValue(
                    "icon",
                    e.currentTarget.value,
                    false
                  );
                }}
                error={
                  formikDialog.errors.icon
                    ? (formikDialog.errors.icon as string)
                    : ""
                }
                rightSection={
                  formikDialog.values.icon && (
                    <Icon
                      name="x-circle"
                      onClick={(e) =>
                        formikDialog.setFieldValue("icon", undefined, false)
                      }
                    />
                  )
                }
              />
            </div>
          )}
          {/* 排序 */}
          <div className="min-w-60">
            <NumberInput
              label={t("sort")}
              value={formikDialog.values.orderNum}
              onChange={(val) =>
                formikDialog.setFieldValue("orderNum", val || 0, false)
              }
              min={0}
              max={9999}
            />
          </div>
          {/* 备注 */}
          {formikDialog.values.menuType !== "F" && (
            <div
              className={`${
                formikDialog.errors.remarkJson ? "has-error" : ""
              } min-w-60`}
            >
              <JsonInput
                label={ct("remark")}
                placeholder={ct("placeholder_input") + ct("remark")}
                description={ct("description_json_input")}
                value={formikDialog.values.remarkJson || ""}
                onChange={(val) => {
                  formikDialog.setFieldError("remarkJson", undefined);
                  formikDialog.setFieldValue("remarkJson", val, false);
                }}
                error={
                  formikDialog.errors.remarkJson
                    ? (formikDialog.errors.remarkJson as string)
                    : ""
                }
                rightSection={
                  formikDialog.values.remarkJson && (
                    <Icon
                      name="x-circle"
                      className="w-5 h-5"
                      onClick={(e) =>
                        formikDialog.setFieldValue(
                          "remarkJson",
                          undefined,
                          false
                        )
                      }
                    />
                  )
                }
                autosize
                formatOnBlur
              />
            </div>
          )}
          {/* 支持版本 */}
          <div className="min-w-60">
            <TextInput
              label={t("version")}
              placeholder={ct("placeholder_input") + t("version")}
              value={formikDialog.values.menuVersion}
              onChange={(e) => {
                formikDialog.setFieldError("menuVersion", undefined);
                formikDialog.setFieldValue(
                  "menuVersion",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.menuVersion
                  ? (formikDialog.errors.menuVersion as string)
                  : ""
              }
              rightSection={
                formikDialog.values.path && (
                  <Icon
                    name="x-circle"
                    onClick={(e) =>
                      formikDialog.setFieldValue(
                        "menuVersion",
                        undefined,
                        false
                      )
                    }
                  />
                )
              }
            />
          </div>
          {/* 是否隐藏 */}
          {formikDialog.values.menuType !== "F" && (
            <div className="min-w-60">
              <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
                {t("hidden_flag")}
              </label>
              <div className="text-sm">
                {remoteDictSysYesNo.map((item: any) => {
                  return (
                    <label className="inline-flex mr-4" key={item.value}>
                      <input
                        type="radio"
                        name="hiddenFlag"
                        className="form-radio"
                        checked={item.value == formikDialog.values.hiddenFlag}
                        onChange={() =>
                          formikDialog.setFieldValue(
                            "hiddenFlag",
                            item.value,
                            false
                          )
                        }
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          <div className="min-w-60">
            <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
              {t("status")}
            </label>
            <div className="text-sm">
              {remoteDictSysStatus.map((item: any) => {
                return (
                  <label className="inline-flex mr-4" key={item.value}>
                    <input
                      type="radio"
                      name="status"
                      className="form-radio"
                      disabled={item.value == "3"}
                      checked={item.value == formikDialog.values.status}
                      onChange={() =>
                        formikDialog.setFieldValue("status", item.value, false)
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* 归属 */}
          <div className="min-w-60">
            <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
              {t("affiliate")}
            </label>
            <div className="text-sm">
              {remoteDictSysAffiliate.map((item: any) => {
                return (
                  <label className="inline-flex mr-4" key={item.value}>
                    <input
                      type="radio"
                      name="affiliate"
                      className="form-radio"
                      checked={item.value == formikDialog.values.affiliateFlag}
                      onChange={() =>
                        formikDialog.setFieldValue(
                          "affiliateFlag",
                          item.value,
                          false
                        )
                      }
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </form>
        {/* button */}

        <div className="flex justify-end items-center mt-8 space-x-2">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => closeDialog()}
          >
            {ct("cancel")}
          </button>
          {dialogType >= 3 && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                if (!formikDialog.isValid) {
                  logger.debug("formikDialog errors", formikDialog.errors);
                }
                formikDialog.submitForm();
              }}
            >
              {formikDialog.isSubmitting && (
                <span className="animate-spin border-[2px] border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle m-auto mr-2"></span>
              )}
              {ct("submit")}
            </button>
          )}
        </div>
      </div>
    </>
  );
  //#endregion

  const handleDeleteRow = async (id: string | number) => {
    Toast.fireWarnConfirmModel({
      html: <p>{ct("desc_delete_id") + id}</p>,
      callback: async () => {
        const res = await SystemDictDataApi.delete([id]);
        if (res) pageDataMutate();
      },
    });
  };
  const handleEditRow = async (id: string | number) => {
    openDialog(4, id);
  };

  //#region table
  const {
    data: pageData,
    isLoading,
    mutate: pageDataMutate,
  } = SystemMenuApi.useList({});
  const [expandedMenuIds, setExpandedMenuIds] = useState<number[]>([]);
  // nested datatable -- PageDataTableColumns
  const NestedDataTableColumns: DataTableColumn<any>[] = [
    {
      accessor: "menuNameJson",
      title: t("name"),
      width: 200,
      textAlign: "center",
      render: (row: any) => {
        return (
          <div className="flex justify-start items-center">
            {row.children && row.children.length > 0 && (
              <Icon
                name="arrow-right"
                className={`w-5 h-5 transition-all duration-300 mr-4 rtl:ml-4 ${
                  expandedMenuIds.includes(row.id)
                    ? "rotate-90 rtl:rotate-90"
                    : "rtl:rotate-180"
                }`}
              />
            )}
            <span>{translate(row.menuNameJson)}</span>
          </div>
        );
      },
    },
    {
      accessor: "menuKey",
      title: t("key"),
      width: 120,
      textAlign: "center",
      render: (row: any) => datatableColumnText(row, "menuKey"),
    },
    {
      accessor: "menuType",
      title: t("type"),
      width: 100,
      textAlign: "center",
    },
    {
      accessor: "path",
      title: t("path"),
      width: 200,
      textAlign: "center",
      render: (row: any) => datatableColumnText(row, "path"),
    },
    {
      accessor: "status",
      title: t("status"),
      width: 100,
      textAlign: "center",
      render: (row: any) => dictVal2Label(remoteDictSysStatus, row.status),
    },
    {
      accessor: "menuVersion",
      title: t("version"),
      width: 100,
      textAlign: "center",
    },
    {
      accessor: "affiliateFlag",
      title: t("affiliate"),
      width: 100,
      textAlign: "center",
      render: (row: any) =>
        dictVal2Label(remoteDictSysAffiliate, row.affiliateFlag),
    },
    {
      accessor: "actions",
      title: ct("actions"),
      textAlign: "center",
      render: (row: any) => {
        return row.id ? (
          <div className="flex justify-center items-center gap-2" key={row.id}>
            <WithPermissions permissions={["sys:menu:update"]}>
              <button
                type="button"
                className="btn btn-xs btn-outline-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditRow(row.id);
                }}
              >
                <Icon name="pencil-paper" className="w-5 h-5 fill-primary-4" />
                {ct("update")}
              </button>
            </WithPermissions>
            {row.menuType != "F" && (
              <WithPermissions permissions={["sys:menu:add"]}>
                <button
                  type="button"
                  className="btn btn-xs btn-outline-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    formikDialog.setFieldValue("parentId", row.id, false);
                    openDialog(3);
                  }}
                >
                  <Icon
                    name="plus-circle"
                    className="w-5 h-5 mr-1 fill-success-light"
                  />
                  {ct("add")}
                </button>
              </WithPermissions>
            )}
            {row.status !== "3" && (
              <WithPermissions permissions={["sys:menu:delete"]}>
                <button
                  type="button"
                  className="btn btn-xs mr-1 btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRow(row.id);
                  }}
                >
                  <Icon
                    name="trash-lines"
                    className="w-5 h-5 mr-1 fill-danger-light"
                  />
                  {ct("delete")}
                </button>
              </WithPermissions>
            )}
          </div>
        ) : (
          "--"
        );
      },
    },
  ];
  // nested datatable -- PageDataTableRowExpansion
  const NestedDataTableRowExpansion: DataTableRowExpansionProps<any> = {
    allowMultiple: true,
    expanded: {
      recordIds: expandedMenuIds,
      onRecordIdsChange: setExpandedMenuIds,
    },
    content: (parentMenu: any) => {
      if (parentMenu.record.children && parentMenu.record.children.length > 0) {
        const children = parentMenu.record.children;
        const needRowExpansion = children.some(
          (item: any) => item.children && item.children.length > 0
        );
        return (
          <DataTable
            key={parentMenu.record.menuKey}
            noHeader
            className="table-hover"
            records={parentMenu.record.children}
            columns={NestedDataTableColumns}
            rowExpansion={
              needRowExpansion ? NestedDataTableRowExpansion : undefined
            }
            defaultColumnRender={(row, _, accessor) => {
              const data = row[accessor as keyof typeof row];
              if (data == undefined || data == null || data == "") return "--";
              return data;
            }}
          />
        );
      }
      return null;
    },
  };
  const PageTable = (
    <DataTable
      fetching={isLoading}
      loaderType="dots"
      loaderSize="xl"
      loaderBackgroundBlur={2}
      highlightOnHover
      border={1}
      className="table-hover"
      records={pageData}
      columns={NestedDataTableColumns}
      rowExpansion={NestedDataTableRowExpansion}
      defaultColumnRender={(row, _, accessor) => {
        const data = row[accessor as keyof typeof row];
        if (data == undefined || data == null || data == "") return "--";
        return data;
      }}
      minHeight={300}
    />
  );
  //#endregion

  return (
    <>
      <div className="relative panel overflow-hidden min-h-96">
        <div className="flex flex-wrap gap-2 mb-4 print:hidden">
          <WithPermissions permissions={["sys:menu:add"]}>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => openDialog(3)}
            >
              <Icon name="plus-circle" className="fill-success-light mr-1" />
              {ct("add")}
            </button>
          </WithPermissions>
        </div>
        <div className="relative overflow-hidden min-h-96">{PageTable}</div>
      </div>
      <EditDialog show={show} close={closeDialog}>
        {PageDialog}
      </EditDialog>
    </>
  );
}
