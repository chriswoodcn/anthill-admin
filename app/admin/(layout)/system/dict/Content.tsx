"use client";

import Icon from "@/components/icon/index";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

import { SystemDictTypeApi, SystemDictApi } from "@/lib/hooks/admin/adminApi";
import { DataTable } from "mantine-datatable";
import { WithPermissions } from "@/components/compose/WithPermissions";
import {
  datatableColumnText,
  datatableColumnTranslateText,
} from "@/lib/support/datatableSupport";
import QueryCondition from "../../_component/QueryCondition";
import { dictVal2Label } from "@/lib";

export default function () {
  const { t } = useTranslation("admin_system_dict");
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const initQueryParams = {
    dictName: undefined,
    dictType: undefined,
    status: undefined,
  };
  const [queryParams, updateQueryParams] =
    useImmer<Record<string, any>>(initQueryParams);

  useEffectOnce(() => {
    setPage(1);
  }, [pageSize]);
  useEffectOnce(() => {
    setPageParams({
      pageNum: page,
      pageSize,
      ...queryParams,
    });
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
  const [pageParams, setPageParams] = useState<any>({
    pageNum: page,
    pageSize,
    ...initQueryParams,
  });
  const { data: pageData, isLoading } = SystemDictTypeApi.usePage(pageParams);
  const { data: remoteDictSysStatus } = SystemDictApi.useDict({
    type: "sys_status",
  });
  return (
    <div>
      <QueryCondition
        submit={() => formikQuery.submitForm()}
        reset={() => formikQuery.resetForm()}
      >
        <form className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          <div className="min-w-60">
            <TextInput
              label={t("form_label_2")}
              placeholder={t("placeholder_input") + t("form_label_2")}
              value={formikQuery.values.dictType || ""}
              onChange={(e) =>
                formikQuery.setFieldValue(
                  "dictType",
                  e.currentTarget.value,
                  false
                )
              }
              onKeyUp={(e: any) => {
                // if (e.keyCode == 13) fetchTableData();
              }}
              rightSection={
                formikQuery.values.dictType && (
                  <Icon
                    name="XCircle"
                    fill={true}
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
              label={t("form_label_3")}
              placeholder={t("placeholder_select") + t("form_label_3")}
              value={formikQuery.values.status || null}
              data={remoteDictSysStatus}
              renderOption={({ option, checked }) => {
                return (
                  <div
                    className="flex-1 flex justify-between py-0.5"
                    key={option.value}
                  >
                    {option.label}
                    {checked && <Icon name="Checks" />}
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
              title: t("id"),
              textAlign: "center",
            },
            {
              accessor: "dictNameJson",
              title: t("col_label_1"),
              textAlign: "center",
              render: (row: any) =>
                datatableColumnTranslateText(row, "dictNameJson"),
            },
            {
              accessor: "dictType",
              title: t("col_label_2"),
              textAlign: "center",
              render: (row: any) => (
                <a className="w-full underline cursor-pointer text-center text-primary">
                  {row.dictType}
                </a>
              ),
            },
            {
              accessor: "status",
              title: t("col_label_3"),
              textAlign: "center",
              render: (row: any) =>
                dictVal2Label(remoteDictSysStatus, row.status),
            },
            {
              accessor: "remarkJson",
              title: t("remark"),
              textAlign: "center",
              render: (row: any) =>
                datatableColumnTranslateText(row, "remarkJson"),
            },
            {
              accessor: "actions",
              title: t("actions"),
              textAlign: "center",
              render: (row: any) => {
                return row.id && row.status !== "3" ? (
                  <div
                    className="flex justify-center space-x-4"
                    key={row.dictId}
                  >
                    <WithPermissions permissions={["system:dict:edit"]}>
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Icon
                          name="pencil-paper"
                          className="w-4 h-4 fill-primary-4"
                        />
                        {t("update")}
                      </button>
                    </WithPermissions>
                    <WithPermissions permissions={["system:dict:remove"]}>
                      <button
                        type="button"
                        className="btn btn-xs mr-1 btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Icon
                          name="trash-lines"
                          className="w-4 h-4 mr-1 fill-danger-light"
                        />
                        {t("delete")}
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
          recordsPerPageLabel={t("records_per_page")}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          minHeight={300}
        />
      </div>
    </div>
  );
}
