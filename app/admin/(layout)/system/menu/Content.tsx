"use client";

import { useTranslation } from "react-i18next";
import { WithPermissions } from "@/components/compose/WithPermissions";
import useAdminFetch from "@/lib/hooks/admin/useAdminFetch";
import { useState } from "react";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { SystemMenuApi } from "@/lib/hooks/admin/adminApi";
import {
  DataTable,
  DataTableColumn,
  DataTableRowExpansionProps,
} from "mantine-datatable";
import { translate } from "@/lib/client";
import Icon from "@/components/icon/index";
import logger from "@/lib/logger";
import { datatableColumnText } from "@/lib/support/datatableSupport";

export default function () {
  const { t } = useTranslation("admin_system_menu");
  const [menuDataList, setMenuDataList] = useState<any[]>([]);
  const [fetchListParams, setFetchListParams] = useState<any>({});
  const { data, error, isLoading } = SystemMenuApi.useList(fetchListParams);
  useEffectOnce(() => {
    if (data && data.code == 200) {
      setMenuDataList(data.data);
    } else {
      setMenuDataList([]);
    }
  }, [data]);
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
                className={`w-4 h-4 transition-all duration-300 mr-4 rtl:ml-4 ${
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
    },
    {
      accessor: "actions",
      title: t("actions"),
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
                }}
              >
                <Icon name="pencil-paper" className="w-4 h-4 fill-primary-4" />
                {t("update")}
              </button>
            </WithPermissions>
            {row.menuType != "F" && (
              <WithPermissions permissions={["sys:menu:add"]}>
                <button
                  type="button"
                  className="btn btn-xs btn-outline-success"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Icon
                    name="plus-circle"
                    className="w-4 h-4 mr-1 fill-success-light"
                  />
                  {t("add")}
                </button>
              </WithPermissions>
            )}
            <WithPermissions permissions={["sys:menu:delete"]}>
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
              logger.debug("row", row);
              if (data == undefined || data == null || data == "") return "--";
              return data;
            }}
          />
        );
      }
      return null;
    },
  };

  return (
    <div className="panel min-h-full">
      <div className="flex flex-wrap gap-2 mb-4 print:hidden">
        <WithPermissions permissions={["sys:menu:add"]}>
          <button type="button" className="btn btn-outline-primary">
            <Icon name="plus-circle" className="fill-success-light mr-1" />
            {t("add")}
          </button>
        </WithPermissions>
      </div>
      <div className="relative overflow-hidden min-h-96">
        <DataTable
          fetching={isLoading}
          loaderType="dots"
          loaderSize="xl"
          loaderBackgroundBlur={2}
          highlightOnHover
          border={1}
          className="table-hover whitespace-nowrap"
          records={menuDataList}
          columns={NestedDataTableColumns}
          rowExpansion={NestedDataTableRowExpansion}
          defaultColumnRender={(row, _, accessor) => {
            const data = row[accessor as keyof typeof row];
            logger.debug("row", row);
            if (data == undefined || data == null || data == "") return "--";
            return data;
          }}
          minHeight={300}
        />
      </div>
    </div>
  );
}
