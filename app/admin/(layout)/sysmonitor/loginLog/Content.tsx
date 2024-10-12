"use client";

import { useRouter } from "next/navigation";
import { JsonInput, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

import { dictVal2Label, formatDateTime } from "@/lib";
import {
  SystemDictApi,
  SystemDictTypeApi,
  SysUserRoleApi,
  SysCompanyApi,
  SysLoginInfoApi,
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
import { IconUserSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { format } from "crypto-js";

export default function SysuserCompanyContent() {
  const { t, i18n } = useTranslation("admin_sysmonitor_login");
  const { t: ct } = useTranslation("admin_common");
  const router = useRouter();

  //#region query
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const initQueryParams = {
    account: undefined,
    success: undefined,
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
  } = SysLoginInfoApi.usePage({
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
  const { data: remoteDictSysYesNo } = SystemDictApi.useDict({
    type: "sys_yes_no",
  });
  const { data: remoteTemplateSelect } = SysUserRoleApi.useTemplateSelect({
    flag: "2",
  });

  //#endregion

  //#region dialog
  const [show, setShow] = useState(false);
  const initialForm = {
    id: undefined,
    account: undefined,
    success: "1",
    ipaddr: undefined,
    loginTime: undefined,
    loginLocation: undefined,
    os: undefined,
    browser: undefined,
    errorMsg: undefined,
  };
  const [form, updateForm] = useImmer<Record<string, any>>(initialForm);
  const formikDialog = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      companyNameJson: Yup.string()
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
      templateId: Yup.number().required(),
      activeTime: Yup.number().nullable(),
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
        result = await SysCompanyApi.add(formikDialog.values);
        break;
      case 4:
        result = await SysCompanyApi.update(formikDialog.values);
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
    const r0 = await SysLoginInfoApi.getById(formId);
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
        <form
          className="grid grid-cols-2 gap-2 text-black-7 dark:text-white-7"
          onSubmit={formikDialog.handleSubmit}
        >
          <div className="min-w-60 col-span-2">
            <label className="text-white-5 dark:text-black-5">
              {t("account")}
            </label>
            <div className="text-wrap break-all">
              {formikDialog.values.account || "--"}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">
              {t("ipaddr")}
            </label>
            <div className="text-wrap break-all">
              {formikDialog.values.ipaddr || "--"}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">
              {t("login_location")}
            </label>
            <div className="text-wrap break-all">
              {formikDialog.values.loginLocation || "--"}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">
              {t("browser")}
            </label>
            <div className="text-wrap break-all">
              {formikDialog.values.browser || "--"}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">{t("os")}</label>
            <div className="text-wrap break-all">
              {formikDialog.values.os || "--"}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">
              {t("success")}
            </label>
            <div className="text-wrap break-all">
              {dictVal2Label(remoteDictSysYesNo, formikDialog.values.success)}
            </div>
          </div>
          <div className="min-w-30 col-span-1">
            <label className="text-white-5 dark:text-black-5">
              {t("login_time")}
            </label>
            <div className="text-wrap break-all">
              {formatDateTime(formikDialog.values.loginTime || -1)}
            </div>
          </div>
          <div className="min-w-60 col-span-2">
            <label className="text-white-5 dark:text-black-5">
              {t("error_msg")}
            </label>
            <div className="text-wrap break-all">
              {formikDialog.values.errorMsg || "--"}
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
                  logger.debug(formikDialog.errors);
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
        const ids = [id];
        const res = await SysLoginInfoApi.clear(ids);
        if (res) pageDataMutate();
      },
    });
  };
  const handleClear = async () => {
    Toast.fireWarnConfirmModel({
      html: <p>{ct("desc_clear")}</p>,
      callback: async () => {
        const res = await SysLoginInfoApi.clear();
        if (res) pageDataMutate();
      },
    });
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
          accessor: "account",
          title: t("account"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "account"),
        },
        {
          accessor: "ipaddr",
          title: t("ipaddr"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "ipaddr"),
        },
        {
          accessor: "loginLocation",
          title: t("login_location"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "loginLocation"),
        },
        {
          accessor: "browser",
          title: t("browser"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "browser"),
        },
        {
          accessor: "os",
          title: t("os"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "os"),
        },
        {
          accessor: "success",
          title: t("success"),
          textAlign: "center",
          render: (row: any) => dictVal2Label(remoteDictSysYesNo, row.success),
        },
        {
          accessor: "loginTime",
          title: t("login_time"),
          textAlign: "center",
          render: (row: any) => formatDateTime(row.loginTime),
        },
        {
          accessor: "actions",
          title: ct("actions"),
          textAlign: "center",
          render: (row: any) => {
            return row.id ? (
              <div className="flex justify-center space-x-4" key={row.dictId}>
                <WithPermissions permissions={["system:loginLog:list"]}>
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
                <WithPermissions permissions={["system:loginLog:delete"]}>
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
              label={t("account")}
              placeholder={ct("placeholder_input") + t("account")}
              value={formikQuery.values.account || ""}
              onChange={(e) =>
                formikQuery.setFieldValue(
                  "account",
                  e.currentTarget.value,
                  false
                )
              }
              onKeyUp={(e: any) => {
                if (e.keyCode == 13) pageDataMutate();
              }}
              rightSection={
                formikQuery.values.account && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikQuery.setFieldValue("account", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
          <div className="min-w-60">
            <Select
              label={t("success")}
              placeholder={ct("placeholder_select") + t("success")}
              value={formikQuery.values.success || null}
              data={remoteDictSysYesNo}
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
                formikQuery.setFieldValue("success", val || undefined, false)
              }
              allowDeselect
            />
          </div>
        </form>
      </QueryCondition>
      <div className="relative panel overflow-hidden min-h-96">
        <div className="flex flex-wrap gap-2 mb-4 print:hidden">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleClear()}
          >
            <Icon
              name="trash-lines"
              className="w-5 h-5 fill-danger-light mr-1"
            />
            {ct("clear")}
          </button>
        </div>
        {PageTable}
      </div>
      <EditDialog show={show} close={closeDialog}>
        {PageDialog}
      </EditDialog>
    </>
  );
}
