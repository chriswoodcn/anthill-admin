"use client";

import { JsonInput, Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import Link from "next/link";

import { dictVal2Label } from "@/lib";
import { SystemDictApi, SystemDictTypeApi } from "@/lib/hooks/admin/adminApi";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { datatableColumnTranslateText } from "@/lib/support/datatableSupport";
import Yup from "@/lib/validation";
import { DataTable } from "mantine-datatable";

import { WithPermissions } from "@/components/compose/WithPermissions";
import Icon from "@/components/icon/index";
import EditDialog from "../../_component/EditDialog";
import QueryCondition from "../../_component/QueryCondition";
import Toast from "@/lib/toast";
import useRole from "@/lib/hooks/admin/useRole";

export default function () {
  const { t } = useTranslation("admin_system_dict");
  const { t: ct } = useTranslation("admin_common");
  const { isRoleSuperAdmin } = useRole();

  //#region query
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const initQueryParams = {
    dictType: undefined,
    status: undefined,
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
  } = SystemDictTypeApi.usePage({
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
  //#endregion

  //#region dialog
  const [show, setShow] = useState(false);
  const initialForm = {
    id: undefined,
    dictNameJson: undefined,
    dictType: undefined,
    status: "0",
    remarkJson: undefined,
    version: 0,
  };
  const [form, updateForm] = useImmer<Record<string, any>>(initialForm);
  const formikDialog = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      dictNameJson: Yup.string()
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
      dictType: Yup.string().required(),
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
        result = await SystemDictTypeApi.add(formikDialog.values);
        break;
      case 4:
        result = await SystemDictTypeApi.update(formikDialog.values);
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
    const r0 = await SystemDictTypeApi.getById(formId);
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
          <div
            className={`${
              formikDialog.errors.dictNameJson ? "has-error" : ""
            } min-w-60`}
          >
            <JsonInput
              withAsterisk
              label={t("name")}
              placeholder={ct("placeholder_input") + t("name")}
              description={ct("description_json_input")}
              value={formikDialog.values.dictNameJson || ""}
              onChange={(val) => {
                formikDialog.setFieldError("dictNameJson", undefined);
                formikDialog.setFieldValue("dictNameJson", val, false);
              }}
              error={
                formikDialog.errors.dictNameJson
                  ? (formikDialog.errors.dictNameJson as string)
                  : ""
              }
              rightSection={
                formikDialog.values.dictNameJson && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue(
                        "dictNameJson",
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
          <div
            className={`${
              formikDialog.errors.dictType ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              withAsterisk
              label={t("type")}
              placeholder={ct("placeholder_input") + t("type")}
              value={formikDialog.values.dictType}
              onChange={(e) => {
                formikDialog.setFieldError("dictType", undefined);
                formikDialog.setFieldValue(
                  "dictType",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.dictType
                  ? (formikDialog.errors.dictType as string)
                  : ""
              }
              rightSection={
                formikDialog.values.dictType && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue("dictType", undefined, false)
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
                      onChange={() => {
                        formikDialog.setFieldValue("status", item.value, false);
                      }}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
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
              onClick={() => formikDialog.submitForm()}
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
  const handleRefreshCache = async () => await SystemDictTypeApi.refresh();

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
          accessor: "dictNameJson",
          title: t("name"),
          textAlign: "center",
          render: (row: any) =>
            datatableColumnTranslateText(row, "dictNameJson"),
        },
        {
          accessor: "dictType",
          title: t("type"),
          textAlign: "center",
          render: (row: any) => (
            <Link
              href={{
                pathname: "/admin/system/dict_data",
                query: { dict_type: row.dictType, status: row.status },
              }}
              className="w-full underline cursor-pointer text-center text-primary"
            >
              {row.dictType}
            </Link>
          ),
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
                  <WithPermissions permissions={["system:dict:delete"]}>
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
              label={t("type")}
              placeholder={ct("placeholder_input") + t("type")}
              value={formikQuery.values.dictType || ""}
              onChange={(e) =>
                formikQuery.setFieldValue(
                  "dictType",
                  e.currentTarget.value,
                  false
                )
              }
              onKeyUp={(e: any) => {
                if (e.keyCode == 13) pageDataMutate();
              }}
              rightSection={
                formikQuery.values.dictType && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikQuery.setFieldValue("dictType", undefined, false)
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
          <WithPermissions permissions={["sys:dict:refresh"]}>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleRefreshCache()}
            >
              <Icon name="refresh" className="w-5 h-5 fill-danger-light mr-1" />
              {ct("refresh")}
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
