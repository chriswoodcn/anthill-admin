/**
 * 系统菜单
 */
export const SystemMenu = {
  list: (data: Record<string, any> = {}) => ({
    url: '/backend/menu/list', method: 'POST', data: data
  }),
  page: () => ({ url: '', method: 'GET', params: {} }),
  add: () => ({ url: '', method: 'POST', data: {} }),
  update: () => ({ url: '', method: 'POST', params: {} }),
  delete: () => ({ url: '', method: 'GET', params: {} }),
}
