/**
 * 目录为一组菜单
 * 菜单可以有子级菜单，
 *    末端菜单必须有path路径，
 *    顶级菜单显示icon，为保证UI美观需要有icon字段映射IconMenu
 */
interface MenuOptions {
  menuType: 'M' | 'C', //类型 目录 菜单
  parentKey?: string, //父级键
  menuKey?: string, //唯一键  也用作i18n名称或国际化别名
  path?: string,
  icon?: string,
  layout?: 'default' | 'blank' //布局 默认布局 空白布局
  children?: Menu[] // 子级,
}
export type Menu = MenuOptions & Record<string, any>

/**
 * 递归扁平化菜单树结构为简单数组
 */
export const flatMenuTree2MenuList = (list: Menu[]) => {
  let result: Menu[] = [];
  list.forEach((el) => {
    let copyEl = { ...el }
    if (copyEl.children && copyEl.children.length > 0) {
      let children = flatMenuTree2MenuList(copyEl.children);
      result = [...result, ...children];
      copyEl.children = undefined;
    }
    result.push(copyEl);
  });
  return result;
};
