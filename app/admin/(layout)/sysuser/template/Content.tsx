"use client";

import { JsonInput, Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

import { dictVal2Label } from "@/lib";
import {
  SystemDictApi,
  SystemDictTypeApi,
  SysUserRoleApi,
  SystemMenuApi,
} from "@/lib/hooks/admin/adminApi";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import {
  datatableColumnText,
  datatableColumnTranslateText,
} from "@/lib/support/datatableSupport";
import Yup from "@/lib/validation";
import { DataTable } from "mantine-datatable";

import { WithPermissions } from "@/components/compose/WithPermissions";
import Icon from "@/components/icon/index";
import EditDialog from "../../_component/EditDialog";
import QueryCondition from "../../_component/QueryCondition";
import Toast from "@/lib/toast";
import RcTreeCheckbox from "../../_component/RcTreeCheckbox";
import useRole from "@/lib/hooks/admin/useRole";

export default function () {
  const { t } = useTranslation("admin_sysuser_template");
  const { t: ct } = useTranslation("admin_common");
  const { isRoleSuperAdmin } = useRole();

  //#region query
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const initQueryParams = {
    roleKey: undefined,
    status: undefined,
    affiliateFlag: undefined,
    templateFlag: "1",
  };
  const [queryParams, updateQueryParams] =
    useImmer<Record<string, any>>(initQueryParams);
  useEffectOnce(() => {
    setPage(1);
  }, [pageSize]);
  useEffectOnce(() => {
    pageDataMutate();
  }, [page, pageSize, queryParams]);
  const formikQuery = useFormik({
    initialValues: initQueryParams,
    onSubmit: (values) => {
      logger.debug("onSubmit values=", values);
      updateQueryParams((e) => (e = values));
      setPage(1);
    },
    onReset: (values) => {
      logger.debug("onReset values=", values);
      formikQuery.setValues(initQueryParams);
      updateQueryParams((e) => (e = initQueryParams));
      setPage(1);
    },
  });
  const {
    data: pageData,
    isLoading,
    mutate: pageDataMutate,
  } = SysUserRoleApi.usePage({
    pageNum: page,
    pageSize,
    ...queryParams,
  });
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

  //#endregion

  //#region dialog
  const [show, setShow] = useState(false);
  const initialForm = {
    id: undefined,
    roleKey: undefined,
    status: "0",
    remarkJson: undefined,
    roleSort: 0,
    affiliateFlag: "2",
    comId: undefined,
    version: 0,
    menuIds: [],
    templateFlag: "1",
  };
  const [form, updateForm] = useImmer<Record<string, any>>(initialForm);
  const formikDialog = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      roleKey: Yup.string().required(),
      remarkJson: Yup.string()
        .nullable()
        .test({
          name: "json",
          message: ct("validation_error.field_json_invalid"),
          test: (val) => {
            try {
              if (val) JSON.parse(val);
              return true;
            } catch (error) {
              return false;
            }
          },
        }),
      menuIds: Yup.array().min(1, ct("validation_error.field_required")),
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
  const handleSubmitDialog = async () => {
    let result;
    switch (dialogType) {
      case 3:
        result = await SysUserRoleApi.add(formikDialog.values);
        break;
      case 4:
        result = await SysUserRoleApi.update(formikDialog.values);
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
  // 获取所有的菜单
  const [allMenus, setAllMenus] = useState<any[]>([]);
  const fetchAllMenus = async () => {
    const r0 = await SystemMenuApi.all({
      affiliateFlag: formikDialog.values.affiliateFlag,
    });
    if (r0) {
      setAllMenus(r0);
    }
  };
  useEffectOnce(() => {
    fetchAllMenus();
  }, [formikDialog.values.affiliateFlag]);
  // 获取模板拥有的菜单
  const [checkedMenuIds, setCheckedMenuIds] = useState<any[]>([]);
  const fetchMenuIdsByRoleId = async () => {};
  const openDialog = async (
    type: number | undefined = 0,
    formId: number | string | undefined = undefined
  ) => {
    setDialogType(type);
    if (type == 3) {
      await fetchAllMenus();
      setShow(true);
      return;
    }
    if (formId == undefined) return;
    const r0 = await SysUserRoleApi.getById(formId);
    if (r0) {
      for (const key in initialForm) {
        if (Object.prototype.hasOwnProperty.call(initialForm, key)) {
          formikDialog.setFieldValue(key, r0[key], false);
        }
      }
    }
    await fetchAllMenus();
    await fetchMenuIdsByRoleId();
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
          <div
            className={`${
              formikDialog.errors.roleKey ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              withAsterisk
              label={t("template_key")}
              placeholder={ct("placeholder_input") + t("template_key")}
              value={formikDialog.values.roleKey}
              onChange={(e) => {
                formikDialog.setFieldError("roleKey", undefined);
                formikDialog.setFieldValue(
                  "roleKey",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.roleKey
                  ? (formikDialog.errors.roleKey as string)
                  : ""
              }
              rightSection={
                formikDialog.values.roleKey && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue("roleKey", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
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
                      disabled={item.value == "3" && !isRoleSuperAdmin}
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
                      name="affiliateFlag"
                      className="form-radio"
                      disabled={item.value == "3"}
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
          {/* 模板菜单&权限 */}
          <div
            className={`${
              formikDialog.errors.menuIds ? "has-error" : ""
            } mt-2 min-w-60`}
          >
            <RcTreeCheckbox
              fieldNames={{
                children: "children",
                title: "menuNameJson",
                key: "id",
              }}
              trans="true"
              withAsterisk
              label={t("menu_permissions")}
              checkModel="all"
              data={allMenus}
              value={formikDialog.values.menuIds || []}
              onChange={(checked) => {
                logger.debug("TreeCheckbox onChange", checked);
                formikDialog.setFieldError("menuIds", undefined);
                formikDialog.setFieldValue("menuIds", checked, false);
              }}
              error={
                formikDialog.errors.menuIds
                  ? (formikDialog.errors.menuIds as string)
                  : ""
              }
            />
          </div>
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
                      formikDialog.setFieldValue("remarkJson", undefined, false)
                    }
                  />
                )
              }
              autosize
              formatOnBlur
            />
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
                  logger.debug("errors", formikDialog.errors);
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

  const handleDetailRow = async (id: string | number) => {
    openDialog(2, id);
  };
  const handleDeleteRow = async (id: string | number) => {
    Toast.fireWarnConfirmModel({
      html: <p>{ct("desc_delete_id") + id}</p>,
      callback: async () => {
        const res = await SystemDictTypeApi.delete([id]);
        if (res) pageDataMutate();
      },
    });
  };
  const handleEditRow = async (id: string | number) => {
    openDialog(4, id);
  };

  //#region table
  const PageTable = (
    <DataTable
      fetching={isLoading}
      loaderType="dots"
      loaderSize="xl"
      loaderBackgroundBlur={2}
      highlightOnHover
      border={1}
      className="table-hover whitespace-nowrap"
      columns={[
        {
          accessor: "id",
          title: ct("id"),
          textAlign: "center",
        },
        {
          accessor: "roleKey",
          title: t("template_key"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "roleKey"),
        },
        {
          accessor: "status",
          title: t("status"),
          textAlign: "center",
          render: (row: any) => dictVal2Label(remoteDictSysStatus, row.status),
        },
        {
          accessor: "remarkJson",
          title: ct("remark"),
          textAlign: "center",
          render: (row: any) => datatableColumnTranslateText(row, "remarkJson"),
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
              <div className="flex justify-center space-x-4" key={row.dictId}>
                <WithPermissions permissions={["system:dict:list"]}>
                  <button
                    type="button"
                    className="btn btn-xs mr-1 btn-outline-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailRow(row.id);
                    }}
                  >
                    <Icon
                      name="view"
                      className="w-5 h-5 mr-1 fill-secondary-light"
                    />
                    {ct("detail")}
                  </button>
                </WithPermissions>
                {(row.status != "3" || isRoleSuperAdmin) && (
                  <WithPermissions permissions={["system:dict:edit"]}>
                    <button
                      type="button"
                      className="btn btn-xs btn-outline-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditRow(row.id);
                      }}
                    >
                      <Icon
                        name="pencil-paper"
                        className="w-5 h-5 fill-primary-4"
                      />
                      {ct("update")}
                    </button>
                  </WithPermissions>
                )}
                {row.status != "3" && (
                  <WithPermissions permissions={["system:dict:remove"]}>
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
      ]}
      defaultColumnRender={(row, _, accessor) => {
        const data = row[accessor as keyof typeof row];
        if (data == undefined || data == null || data == "") return "--";
        return data;
      }}
      records={pageData?.list || []}
      totalRecords={pageData?.totalCount || 0}
      recordsPerPageLabel={ct("records_per_page")}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      minHeight={300}
    />
  );

  return (
    <>
      <QueryCondition
        submit={() => formikQuery.submitForm()}
        reset={() => formikQuery.resetForm()}
      >
        <form className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          <div className="min-w-60">
            <TextInput
              label={t("template_key")}
              placeholder={ct("placeholder_input") + t("template_key")}
              value={formikQuery.values.roleKey || ""}
              onChange={(e) =>
                formikQuery.setFieldValue(
                  "roleKey",
                  e.currentTarget.value,
                  false
                )
              }
              onKeyUp={(e: any) => {
                if (e.keyCode == 13) pageDataMutate();
              }}
              rightSection={
                formikQuery.values.roleKey && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikQuery.setFieldValue("roleKey", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
          <div className="min-w-60">
            <Select
              label={t("status")}
              placeholder={ct("placeholder_select") + t("status")}
              value={formikQuery.values.status || null}
              data={remoteDictSysStatus}
              renderOption={({ option, checked }) => {
                return (
                  <div
                    className="flex-1 flex justify-between py-0.5"
                    key={option.value}
                  >
                    {option.label}
                    {checked && (
                      <Icon
                        name="check"
                        className="w-5 h-5 text-white-5 dark:text-black-5"
                      />
                    )}
                  </div>
                );
              }}
              onChange={(val, option) =>
                formikQuery.setFieldValue("status", val || undefined, false)
              }
              allowDeselect
            />
          </div>
          <div className="min-w-60">
            <Select
              label={t("affiliate")}
              placeholder={ct("placeholder_select") + t("affiliate")}
              value={formikQuery.values.affiliateFlag || null}
              data={remoteDictSysAffiliate}
              renderOption={({ option, checked }) => {
                return (
                  <div
                    className="flex-1 flex justify-between py-0.5"
                    key={option.value}
                  >
                    {option.label}
                    {checked && (
                      <Icon
                        name="check"
                        className="w-5 h-5 text-white-5 dark:text-black-5"
                      />
                    )}
                  </div>
                );
              }}
              onChange={(val, option) =>
                formikQuery.setFieldValue(
                  "affiliateFlag",
                  val || undefined,
                  false
                )
              }
              allowDeselect
            />
          </div>
        </form>
      </QueryCondition>
      <div className="relative panel overflow-hidden min-h-96">
        <div className="flex flex-wrap gap-2 mb-4 print:hidden">
          <WithPermissions permissions={["sys:dict:add"]}>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => openDialog(3)}
            >
              <Icon
                name="plus-circle"
                className="w-5 h-5 fill-primary-light mr-1"
              />
              {ct("add")}
            </button>
          </WithPermissions>
          <WithPermissions permissions={["sys:dict:export"]}>
            <button type="button" className="btn btn-outline-success">
              <Icon name="export" className="w-5 h-5 fill-success-light mr-1" />
              {ct("export")}
            </button>
          </WithPermissions>
        </div>
        {PageTable}
      </div>
      <EditDialog show={show} close={closeDialog}>
        {PageDialog}
      </EditDialog>
    </>
  );
}
