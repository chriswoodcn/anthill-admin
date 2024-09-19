import useAdminFetch from "./useAdminFetch";

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
 * 系统字典类型
 */
export const SystemDictTypeApi = {
  usePage: (data: Record<string, any> = {}) =>
    useAdminFetch(true, undefined, {
      url: "/backend/dict/type/page",
      method: "POST",
      data,
    }),
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
