import { translate } from "@/lib/client";
import useEffectOnce from "../useEffectOnce";
import useAdminFetch from "./useAdminFetch";
import { useState } from "react";
import { RootState, useAppSelector } from "@/store";
import logger from "@/lib/logger";
import { useTranslation } from "react-i18next";

/**
 * 系统菜单
 */
export const SystemMenuApi = {
  useList: (data: Record<string, any> = {}) =>
    useAdminFetch(true, undefined, {
      url: "/backend/menu/list",
      method: "POST",
      data,
    }),
  page: () => ({ url: "", method: "GET", params: {} }),
  add: () => ({ url: "", method: "POST", data: {} }),
  update: () => ({ url: "", method: "POST", params: {} }),
  delete: () => ({ url: "", method: "GET", params: {} }),
};
/**
 *  筛选系统字典方法
 *  1. sys_status '2' 不显示
 */
function filterDict(records: any[]) {
  if (records.length > 0) {
    if (records[0].dictType == "sys_status") {
      return records.filter((r) => r.dictValue != "2");
    }
  }
  return records;
}
/**
 * 系统字典
 */
export const SystemDictApi = {
  useDict: (params: Record<string, any> = {}) => {
    const { i18n } = useTranslation();
    const [result, setResult] = useState<any[]>([]);
    const { data, isLoading } = useAdminFetch(true, undefined, {
      url: "/backend/dict",
      method: "GET",
      params,
    });
    useEffectOnce(() => {
      if (data && data.code == 200) {
        const res = filterDict(data.data);
        res.forEach((d) => {
          d.value = d.dictValue;
          d.label = translate(d.dictLabelJson);
        });
        setResult(res);
      }
    }, [data, i18n.language]);
    return {
      data: result,
      isLoading,
    };
  },
};
/**
 * 系统字典类型
 */
export const SystemDictTypeApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const { data: fetchData, isLoading } = useAdminFetch(true, undefined, {
      url: "/backend/dict/type/page",
      method: "POST",
      data,
    });
    useEffectOnce(() => {
      if (fetchData && fetchData.code == 200) {
        setResult(fetchData.data);
      }
    }, [fetchData]);
    return {
      data: result,
      isLoading,
    };
  },
  useAdd: (data: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/type/add",
        method: "POST",
        data,
      }
    ),
  useUpdate: (data: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/type/update",
        method: "POST",
        data,
      }
    ),
  useDelete: (ids: string | number[]) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/type/deleteLogic" + ids,
        method: "GET",
      }
    ),
  useRefresh: (params: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/type/refresh",
        method: "GET",
        params,
      }
    ),
};
/**
 * 系统字典数据
 */
export const SystemDictDataApi = {
  usePage: (data: Record<string, any> = {}) =>
    useAdminFetch(true, undefined, {
      url: "/backend/dict/data/page",
      method: "POST",
      data,
    }),
  useAdd: (data: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/data/add",
        method: "POST",
        data,
      }
    ),
  useUpdate: (data: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/data/update",
        method: "POST",
        data,
      }
    ),
  useDelete: (ids: string | number[]) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/data/deleteLogic" + ids,
        method: "GET",
      }
    ),
  useRefresh: (params: Record<string, any> = {}) =>
    useAdminFetch(
      true,
      { show: true, type: "O" },
      {
        url: "/backend/dict/data/refresh",
        method: "GET",
        params,
      }
    ),
};
