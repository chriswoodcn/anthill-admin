import { Menu } from '@/lib/menu';

/**
 * 模板页面菜单树结构
 */
export const TemplateMenuTree: Menu[] = [
  // dashboard
  {
    type: 'M',
    menuKey: 'dashboard',
    children: [
      {
        type: 'C',
        menuKey: 'sales',

        path: '/template/index',
        icon: 'menu-template-sales',
      },
      {
        type: 'C',
        menuKey: 'analytics',

        path: '/template/analytics',
        icon: 'menu-template-analytics',
      },
      {
        type: 'C',
        menuKey: 'finance',

        path: '/template/finance',
        icon: 'menu-template-finance',
      },
      {
        type: 'C',
        menuKey: 'crypto',

        path: '/template/crypto',
        icon: 'menu-template-crypto',
      },
    ]
  },
  // Apps
  {
    type: 'M',
    menuKey: 'apps',
    children: [
      {
        type: 'C',
        menuKey: 'chat',

        path: '/template/apps/chat',
        icon: 'menu-template-chat',
      },
      {
        type: 'C',
        menuKey: 'mailbox',

        path: '/template/apps/mailbox',
        icon: 'menu-template-mailbox',
      },
      {
        type: 'C',
        menuKey: 'todolist',

        path: '/template/apps/todolist',
        icon: 'menu-template-todolist',
      },
      {
        type: 'C',
        menuKey: 'notes',

        path: '/template/apps/notes',
        icon: 'menu-template-notes',
      },
      {
        type: 'C',
        menuKey: 'scrumboard',

        path: '/template/apps/scrumboard',
        icon: 'menu-template-scrumboard',
      },
      {
        type: 'C',
        menuKey: 'contacts',

        path: '/template/apps/contacts',
        icon: 'menu-template-contacts',
      },
      {
        type: 'C',
        menuKey: 'invoice',

        icon: 'menu-template-invoice',
        children: [
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'list',

            path: '/template/apps/invoice/list'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'preview',

            path: '/template/apps/invoice/preview'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'add',

            path: '/template/apps/invoice/add'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'edit',

            path: '/template/apps/invoice/edit'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'calendar',

        path: '/template/apps/calendar',
        icon: 'menu-template-calendar',
      },
    ]
  },
  // User Interface
  {
    type: 'M',
    menuKey: 'user_interface',
    children: [
      {
        type: 'C',
        menuKey: 'components',

        icon: 'menu-template-components',
        children: [
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'tabs',

            path: '/template/components/tabs'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'accordions',

            path: '/template/components/accordions'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'modals',

            path: '/template/components/modals'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'cards',

            path: '/template/components/cards'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'carousel',

            path: '/template/components/carousel'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'countdown',

            path: '/template/components/countdown'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'counter',

            path: '/template/components/counter'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'sweetalert',

            path: '/template/components/sweetalert'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'timeline',

            path: '/template/components/timeline'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'notifications',

            path: '/template/components/notifications'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'media_object',

            path: '/template/components/media-object'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'list_group',

            path: '/template/components/list-group'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'pricing_table',

            path: '/template/components/pricing-table'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'lightbox',

            path: '/template/components/lightbox'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'elements',

        icon: 'menu-template-elements',
        children: [
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'alerts',

            path: '/template/elements/alerts'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'avatar',

            path: '/template/elements/avatar'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'badges',

            path: '/template/elements/badges'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'breadcrumbs',

            path: '/template/elements/breadcrumbs'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'buttons',

            path: '/template/elements/buttons'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'button_groups',

            path: '/template/elements/button-groups'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'color_library',

            path: '/template/elements/color-library'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'dropdown',

            path: '/template/elements/dropdown'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'infobox',

            path: '/template/elements/infobox'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'jumbotron',

            path: '/template/elements/jumbotron'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'loader',

            path: '/template/elements/loader'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'pagination',

            path: '/template/elements/pagination'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'popovers',

            path: '/template/elements/popovers'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'progress_bar',

            path: '/template/elements/progress-bar'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'search',

            path: '/template/elements/search'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'tooltips',

            path: '/template/elements/tooltips'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'treeview',

            path: '/template/elements/treeview'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'typography',

            path: '/template/elements/typography'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'more',

        icon: 'menu-template-more',
        children: [
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'charts',

            path: '/template/more/charts'
          },
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'font_icons',

            path: '/template/more/font-icons'
          },
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'drag_and_drop',

            path: '/template/more/dragndrop'
          },
        ]
      },
    ]
  },
  // tables_and_forms
  {
    type: 'M',
    menuKey: 'tables_and_forms',
    children: [
      {
        type: 'C',
        menuKey: 'tables',

        icon: 'menu-template-tables',
        path: '/template/tables'
      },
      {
        type: 'C',
        menuKey: 'datatables',

        icon: 'menu-template-datatables',
        children: [
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_basic',

            path: '/template/datatables/basic'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_advanced',

            path: '/template/datatables/advanced'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_skin',

            path: '/template/datatables/skin'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_order_sorting',

            path: '/template/datatables/order-sorting'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_multi_column',

            path: '/template/datatables/multi-column'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_multiple_tables',

            path: '/template/datatables/multiple-tables'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_alt_pagination',

            path: '/template/datatables/alt-pagination'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_checkbox',

            path: '/template/datatables/checkbox'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_range_search',

            path: '/template/datatables/range-search'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_export',

            path: '/template/datatables/export'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_column_chooser',

            path: '/template/datatables/column-chooser'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'forms',

        icon: 'menu-template-forms',
        children: [
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_basic',

            path: '/template/forms/basic'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_input_group',

            path: '/template/forms/input-group'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_layouts',

            path: '/template/forms/layouts'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_validation',

            path: '/template/forms/validation'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_input_mask',

            path: '/template/forms/input-mask'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_select2',

            path: '/template/forms/select2'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_touchspin',

            path: '/template/forms/touchspin'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_checkbox_and_radio',

            path: '/template/forms/checkbox-radio'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_switches',

            path: '/template/forms/switches'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_wizards',

            path: '/template/forms/wizards'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_file_upload',

            path: '/template/forms/file-upload'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_quill_editor',

            path: '/template/forms/quill-editor'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_date_and_range_picker',

            path: '/template/forms/date-picker'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_clipboard',

            path: '/template/forms/clipboard'
          }
        ]
      }
    ]
  },
  // user_and_pages
  {
    type: 'M',
    menuKey: 'user_and_pages',
    children: [
      {
        type: 'C',
        menuKey: 'users',

        icon: 'menu-template-users',
        children: [
          {
            type: 'C',
            parentKey: 'users',
            menuKey: 'profile',

            path: '/template/users/profile'
          },
          {
            type: 'C',
            parentKey: 'users',
            menuKey: 'account_settings',

            path: '/template/users/user-account-settings'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'pages',

        icon: 'menu-template-pages',
        children: [
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'knowledge_base',

            path: '/template/pages/knowledge-base'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'contact_us_boxed',

            layout: 'blank',
            path: '/template/pages/contact-us-boxed'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'contact_us_cover',
            layout: 'blank',
            path: '/template/pages/contact-us-cover'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'coming_soon_boxed',
            layout: 'blank',
            path: '/template/pages/coming-soon-boxed'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'coming_soon_cover',
            layout: 'blank',
            path: '/template/pages/coming-soon-cover'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'error',
            children: [
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '404',

                layout: 'blank',
                path: '/template/pages/error404'
              },
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '500',

                layout: 'blank',
                path: '/template/pages/error500'
              },
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '503',

                layout: 'blank',
                path: '/template/pages/error503'
              }
            ]
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'maintenence',

            layout: 'blank',
            path: '/template/pages/maintenence'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'authentication',

        icon: 'menu-template-authentication',
        children: [
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'login_boxed',

            layout: 'blank',
            path: '/template/auth/boxed-signin'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'register_boxed',

            layout: 'blank',
            path: '/template/auth/boxed-signup'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'unlock_boxed',

            layout: 'blank',
            path: '/template/auth/boxed-password-reset'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'login_cover',

            layout: 'blank',
            path: '/template/auth/cover-login'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'register_cover',

            layout: 'blank',
            path: '/template/auth/cover-register'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'unlock_cover',

            layout: 'blank',
            path: '/template/auth/cover-lockscreen'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'recover_id_cover',

            layout: 'blank',
            path: '/template/auth/cover-password-reset'
          },
        ]
      },
    ]
  }
]
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

export const TemplateMenuList: Menu[] = flatMenuTree2MenuList(TemplateMenuTree)
