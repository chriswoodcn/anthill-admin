import { translate } from "@/lib/client";
import useEffectOnce from "../useEffectOnce";
import useAdminFetch from "./useAdminFetch";
import { useState } from "react";
import logger from "@/lib/logger";
import { useTranslation } from "react-i18next";
import { adminFetcher } from "@/lib/fetcher";
import Toast from "@/lib/toast";
import { i18next } from "@/i18n/client";
enum OperateType {
  GET,
  ADD,
  UPDATE,
  DELETE,
  CLEAR,
}
const handleOperateResponse = (res: any, ot = OperateType.GET) => {
  if (res.code == 200) {
    if (ot == OperateType.GET) {
      return res.data;
    }
    Toast.fireSuccessAction({
      html: (
        <p className="text-2xl font-bold">{i18next.t("operate_success")}</p>
      ),
    });
    return true;
  } else {
    Toast.fireErrorAction({
      html: (
        <p className="text-2xl font-bold">
          {res.msg || i18next.t("operate_error")}
        </p>
      ),
      timer: 0,
    });
    return false;
  }
};
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
  useDict: (
    params: Record<string, any> = {},
    config: Record<string, any> = {}
  ) => {
    const { i18n } = useTranslation();
    const [result, setResult] = useState<any[]>([]);
    const { data, isLoading } = useAdminFetch(true, undefined, {
      url: "/backend/dict",
      method: "GET",
      params,
    });
    useEffectOnce(() => {
      if (data && data.code == 200) {
        const res = config.filter ? config.filter(data.data) : [data.data];
        res.forEach((d: any) => {
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
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
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
      mutate,
    };
  },
  getById: async (id: string | number) => {
    const res = await adminFetcher({
      url: "/backend/dict/type/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/dict/type/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/dict/type/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/dict/type/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
  refresh: async (params: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/dict/type/refresh",
      method: "GET",
      params,
    });
    return handleOperateResponse(res, OperateType.CLEAR);
  },
};
/**
 * 系统字典数据
 */
export const SystemDictDataApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/dict/data/page",
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
      mutate,
    };
  },
  getById: async (id: string | number) => {
    const res = await adminFetcher({
      url: "/backend/dict/data/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/dict/data/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/dict/data/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: string | number[]) => {
    const res = await adminFetcher({
      url: "/backend/dict/data/deleteLogic" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
