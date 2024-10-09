"use client";

import { useRouter } from "next/navigation";
import { Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

import { dictVal2Label } from "@/lib";
import {
  SystemDictApi,
  SystemDictTypeApi,
  SystemUserApi,
} from "@/lib/hooks/admin/adminApi";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { datatableColumnText } from "@/lib/support/datatableSupport";
import Yup from "@/lib/validation";
import { DataTable } from "mantine-datatable";

import { WithPermissions } from "@/components/compose/WithPermissions";
import Icon from "@/components/icon/index";
import EditDialog from "../../_component/EditDialog";
import QueryCondition from "../../_component/QueryCondition";
import Toast from "@/lib/toast";

export default function PanelAdminUser(props: Record<string, any>) {
  const { t } = useTranslation("admin_sysuser_company");
  const { t: ct } = useTranslation("admin_common");
  const router = useRouter();

  //#region query
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const initQueryParams = {
    adminFlag: "1",
    comId: props.comId,
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
  } = SystemUserApi.usePage({
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

  const { data: remoteDictSysSex } = SystemDictApi.useDict({
    type: "sys_sex",
  });

  const { data: remoteDictYesNo } = SystemDictApi.useDict({
    type: "sys_yes_no",
  });

  //#endregion

  //#region dialog
  const [show, setShow] = useState(false);
  const initialForm = {
    id: undefined,
    username: undefined,
    nickname: undefined,
    email: undefined,
    mobile: undefined,
    sex: "2",
    status: "0",
    comId: props.comId,
    version: 0,
    adminFlag: "1",
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
    const r0 = await SystemUserApi.getById(formId);
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
              formikDialog.errors.comId ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              withAsterisk
              label={t("com_id")}
              placeholder={ct("placeholder_input") + t("com_id")}
              value={formikDialog.values.comId || ""}
              error={
                formikDialog.errors.comId
                  ? (formikDialog.errors.comId as string)
                  : ""
              }
            />
          </div>
          <div
            className={`${
              formikDialog.errors.username ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              withAsterisk
              label={t("username")}
              placeholder={ct("placeholder_input") + t("username")}
              value={formikDialog.values.username || ""}
              onChange={(e) => {
                formikDialog.setFieldError("username", undefined);
                formikDialog.setFieldValue(
                  "username",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.username
                  ? (formikDialog.errors.username as string)
                  : ""
              }
              rightSection={
                formikDialog.values.username && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue("username", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
          <div
            className={`${
              formikDialog.errors.nickname ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              withAsterisk
              label={t("nickname")}
              placeholder={ct("placeholder_input") + t("nickname")}
              value={formikDialog.values.nickname || ""}
              onChange={(e) => {
                formikDialog.setFieldError("nickname", undefined);
                formikDialog.setFieldValue(
                  "nickname",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.nickname
                  ? (formikDialog.errors.nickname as string)
                  : ""
              }
              rightSection={
                formikDialog.values.nickname && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue("nickname", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
          <div
            className={`${
              formikDialog.errors.email ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              label={t("email")}
              placeholder={ct("placeholder_input") + t("email")}
              value={formikDialog.values.email || ""}
              onChange={(e) => {
                formikDialog.setFieldError("email", undefined);
                formikDialog.setFieldValue(
                  "email",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.email
                  ? (formikDialog.errors.email as string)
                  : ""
              }
              rightSection={
                formikDialog.values.email && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) => {
                      console.log("x-circle click");
                      formikDialog.setFieldValue("email", undefined, false);
                    }}
                  />
                )
              }
            />
          </div>
          <div
            className={`${
              formikDialog.errors.mobile ? "has-error" : ""
            } min-w-60`}
          >
            <TextInput
              label={t("mobile")}
              placeholder={ct("placeholder_input") + t("mobile")}
              value={formikDialog.values.mobile || ""}
              onChange={(e) => {
                formikDialog.setFieldError("mobile", undefined);
                formikDialog.setFieldValue(
                  "mobile",
                  e.currentTarget.value,
                  false
                );
              }}
              error={
                formikDialog.errors.mobile
                  ? (formikDialog.errors.mobile as string)
                  : ""
              }
              rightSection={
                formikDialog.values.mobile && (
                  <Icon
                    name="x-circle"
                    className="w-5 h-5"
                    onClick={(e) =>
                      formikDialog.setFieldValue("mobile", undefined, false)
                    }
                  />
                )
              }
            />
          </div>
          <div className="min-w-60">
            <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
              {t("gender")}
            </label>
            <div className="text-sm">
              {remoteDictSysSex.map((item: any) => {
                return (
                  <label className="inline-flex mr-4" key={item.value}>
                    <input
                      type="radio"
                      name="gender"
                      className="form-radio"
                      checked={item.value == formikDialog.values.sex}
                      onChange={() =>
                        formikDialog.setFieldValue("sex", item.value, false)
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
          <div className="min-w-60">
            <label className="text-sm ltr:mr-2 rtl:ml-2 self-start mb-2 min-w-24">
              {t("admin_flag")}
            </label>
            <div className="text-sm">
              {remoteDictYesNo.map((item: any) => {
                return (
                  <label className="inline-flex mr-4" key={item.value}>
                    <input
                      type="radio"
                      name="admin_flag"
                      className="form-radio"
                      checked={item.value == formikDialog.values.adminFlag}
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
          accessor: "username",
          title: t("username"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "username"),
        },
        {
          accessor: "nickname",
          title: t("nickname"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "nickname"),
        },
        {
          accessor: "email",
          title: t("email"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "email"),
        },
        {
          accessor: "mobile",
          title: t("mobile"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "mobile"),
        },
        {
          accessor: "status",
          title: t("status"),
          textAlign: "center",
          render: (row: any) => dictVal2Label(remoteDictSysStatus, row.status),
        },
        {
          accessor: "comId",
          title: t("com_id"),
          textAlign: "center",
          render: (row: any) => datatableColumnText(row, "comId"),
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
                {row.status != "3" && (
                  <>
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
                  </>
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
        </div>
        {PageTable}
      </div>
      <EditDialog show={show} close={closeDialog}>
        {PageDialog}
      </EditDialog>
    </>
  );
}
