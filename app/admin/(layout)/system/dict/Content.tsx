"use client";

import Icon from "@/components/icon/index";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { Select, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import QueryCondition from "./QueryCondition";
import useAdminFetch from "@/lib/hooks/admin/useAdminFetch";
import { SystemDictTypeApi } from "@/lib/hooks/admin/adminApi";

export default function () {
  const { t } = useTranslation("admin_system_dict");
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  // const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [fetching, setFetching] = useState(false);
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
    // fetchTableData();
  }, [page, pageSize, queryParams]);
  const formikQuery = useFormik({
    initialValues: initQueryParams,
    onSubmit: (values) => {
      logger.debug("onSubmit values=", values);
      setPage(1);
      setPageParams({
        pageNum: page,
        pageSize,
        ...values,
      });
    },
    onReset: (values) => {
      logger.debug("onReset values=", values);
      formikQuery.setValues(initQueryParams);
      setPage(1);
      setPageParams({
        pageNum: page,
        pageSize,
      });
    },
  });
  const [pageParams, setPageParams] = useState<any>({
    pageNum: page,
    pageSize,
    ...initQueryParams,
  });
  const { data, error, isLoading } = SystemDictTypeApi.usePage(pageParams);
  useEffectOnce(() => {
    logger.debug("useAdminFetch data: ", data);
  }, [data]);
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
              data={[]}
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
    </div>
  );
}
