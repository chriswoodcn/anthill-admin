"use client";

import { useTranslation } from "react-i18next";
import { WithPermissions } from "@/components/compose/WithPermissions";
import useAdminFetch from "@/lib/hooks/admin/userAdminFetch";
import { useEffect, useState } from "react";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { SystemMenu } from "@/lib/hooks/admin/adminApi";
import { Loader } from "@mantine/core";
import {
  DataTable,
  DataTableColumn,
  DataTableRowExpansionProps,
} from "mantine-datatable";

export default function () {
  const { t } = useTranslation("admin_system_menu");
  const [doFetchMenuList, setDoFetchMenuList] = useState(false);
  useEffectOnce(() => {
    setDoFetchMenuList(true);
  }, []);
  const [menuDataList, setMenuDataList] = useState<any[]>([]);
  const { data, error, isLoading } = useAdminFetch(
    doFetchMenuList,
    false,
    SystemMenu.list()
  );
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
      accessor: "status",
      title: "status",
      textAlign: "center",
    },
    {
      accessor: "superFlag",
      title: "superFlag",
      textAlign: "center",
    },
    {
      accessor: "path",
      title: "path",
      textAlign: "center",
    },
    {
      accessor: "actions",
      title: "caozuo",
      textAlign: "center",
      render: (row: any) => {
        return row.id ? (
          <div className="flex justify-center space-x-4" key={row.id}>
            caozuo
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
      if (parentMenu.record.children && parentMenu.record.children.length > 0)
        return (
          <DataTable
            noHeader
            idAccessor="menuId"
            className="table-hover"
            records={parentMenu.record.children}
            columns={NestedDataTableColumns}
            rowExpansion={NestedDataTableRowExpansion}
          />
        );
      return null;
    },
  };

  return (
    <div className="panel min-h-full">
      <div className="flex flex-wrap gap-2 mb-4 print:hidden">
        <WithPermissions permissions={["sys:menu:add"]}>
          <button type="button" className="btn btn-outline-primary">
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
            if (!data) return "--";
            if (typeof data === "string" || typeof data === "number")
              return data;
          }}
          minHeight={300}
        />
      </div>
    </div>
  );
}
