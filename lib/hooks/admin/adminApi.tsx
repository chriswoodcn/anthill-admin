import { translate } from "@/lib/client";
import useEffectOnce from "../useEffectOnce";
import useAdminFetch from "./useAdminFetch";
import { useState } from "react";
import logger from "@/lib/logger";
import { useTranslation } from "react-i18next";
import { adminFetcher, nextFetcher } from "@/lib/fetcher";
import Toast from "@/lib/toast";
import { i18next } from "@/i18n/client";
import { aesDecrypt, aesEncrypt, isBrowser, withBasePath } from "@/lib";

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
  useList: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/menu/list",
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
  useSelect: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/menu/select",
      method: "GET",
      params: data,
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
  all: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/menu/list",
      method: "POST",
      data,
    });
    return handleOperateResponse(res);
  },
  getById: async (id: string | number) => {
    const res = await adminFetcher({
      url: "/backend/menu/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/menu/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/menu/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/menu/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
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

export interface LoginForm {
  username: string | undefined;
  password: string | undefined;
  remember: boolean;
}

export const getStorageLoginForm = () => {
  const emptyForm: LoginForm = {
    username: undefined,
    password: undefined,
    remember: false,
  };
  if (typeof window != "undefined") {
    let jsonStr = window.localStorage.getItem("__admin_login_form__");
    if (!jsonStr) return emptyForm;
    let target = JSON.parse(jsonStr);
    if (!target.remember) return emptyForm;
    if (target.password) target.password = aesDecrypt(target.password);
    return target as LoginForm;
  }
  return emptyForm;
};

export const setStorageLoginForm = ({
  username,
  password,
  remember,
}: LoginForm) => {
  let target = {};
  if (remember == true && username && password) {
    target = { username: username, password: aesEncrypt(password), remember };
  } else {
    target = { remember: false };
  }
  if (isBrowser()) {
    if (password)
      window.localStorage.setItem("__admin_unlock_pwd__", aesEncrypt(password));
    window.localStorage.setItem("__admin_login_form__", JSON.stringify(target));
  }
};
export const SysLoginApi = {
  login: async (data: LoginForm & Record<string, any>) => {
    return await nextFetcher({
      url: withBasePath("/api/auth/login"),
      method: "POST",
      data: data,
    });
  },
  logout: async () => {
    return await nextFetcher({
      url: withBasePath("/api/auth/logout"),
      method: "GET",
    });
  },
};
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
        const res = config.filter ? config.filter(data.data) : [...data.data];
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
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/dict/data/deleteLogic" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
/**
 * 系统配置
 */
export const SystemConfigApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/config/page",
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
      url: "/backend/config/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/config/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/config/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/config/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
  refresh: async (params: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/config/refresh",
      method: "GET",
      params,
    });
    return handleOperateResponse(res, OperateType.CLEAR);
  },
};
/**
 * 系统角色
 */
export const SysUserRoleApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/role/page",
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
      url: "/backend/role/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/role/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/role/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/role/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
  roleSelect: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/role/select",
      method: "GET",
      params: data,
    });
    return handleOperateResponse(res, OperateType.GET);
  },
  useTemplateSelect: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any[]>([]);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/role/templateSelect",
      method: "GET",
      params: data,
    });
    useEffectOnce(() => {
      if (fetchData && fetchData.code == 200) {
        fetchData.data.forEach((item: any) => {
          item.label = item.roleKey;
          item.value = item.id + "";
        });
        setResult(fetchData.data);
      }
    }, [fetchData]);
    return {
      data: result,
      isLoading,
      mutate,
    };
  },
  templateSelect: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/role/templateSelect",
      method: "GET",
      params: data,
    });
    return handleOperateResponse(res, OperateType.GET);
  },
};
/**
 * 客户
 */
export const SysCompanyApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/company/page",
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
      url: "/backend/company/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/company/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/company/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/company/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
/**
 * 系统用户
 */
export const SystemUserApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/user/page",
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
      url: "/backend/user/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  add: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/user/add",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.ADD);
  },
  update: async (data: Record<string, any> = {}) => {
    const res = await adminFetcher({
      url: "/backend/user/update",
      method: "POST",
      data,
    });
    return handleOperateResponse(res, OperateType.UPDATE);
  },
  delete: async (ids: (string | number)[]) => {
    const res = await adminFetcher({
      url: "/backend/user/deleteLogic/" + ids,
      method: "GET",
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
/**
 * 系统登录日志
 */
export const SysLoginInfoApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/record/login/page",
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
      url: "/backend/record/login/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  clear: async (ids: (string | number)[] | undefined = undefined) => {
    const res = await adminFetcher({
      url: "/backend/record/login/clear",
      method: "GET",
      params: {
        ids: ids,
      },
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
/**
 * 系统操作日志
 */
export const SysOperLogApi = {
  usePage: (data: Record<string, any> = {}) => {
    const [result, setResult] = useState<any>(undefined);
    const {
      data: fetchData,
      isLoading,
      mutate,
    } = useAdminFetch(true, undefined, {
      url: "/backend/record/operate/page",
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
      url: "/backend/record/operate/getById/" + id,
      method: "GET",
    });
    return handleOperateResponse(res);
  },
  clear: async (ids: (string | number)[] | undefined = undefined) => {
    const res = await adminFetcher({
      url: "/backend/record/operate/clear",
      method: "GET",
      params: {
        ids,
      },
    });
    return handleOperateResponse(res, OperateType.DELETE);
  },
};
