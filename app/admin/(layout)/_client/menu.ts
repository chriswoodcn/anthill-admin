import { flatMenuTree2MenuList, Menu } from '@/lib/menu';

/**
 * 模板页面菜单树结构
 */
export const TemplateMenuTree: Menu[] = [
  // dashboard
  {
    type: 'M',
    dialect: 'dashboard',
    children: [
      {
        type: 'C',
        menuKey: 'sales',
        dialect: 'sales',
        path: '/template/index',
        icon: 'menu-template-sales',
      },
      {
        type: 'C',
        menuKey: 'analytics',
        dialect: 'analytics',
        path: '/template/analytics',
        icon: 'menu-template-analytics',
      },
      {
        type: 'C',
        menuKey: 'finance',
        dialect: 'finance',
        path: '/template/finance',
        icon: 'menu-template-finance',
      },
      {
        type: 'C',
        menuKey: 'crypto',
        dialect: 'crypto',
        path: '/template/crypto',
        icon: 'menu-template-crypto',
      },
    ]
  },
  // Apps
  {
    type: 'M',
    dialect: 'apps',
    children: [
      {
        type: 'C',
        menuKey: 'chat',
        dialect: 'chat',
        path: '/template/apps/chat',
        icon: 'menu-template-chat',
      },
      {
        type: 'C',
        menuKey: 'mailbox',
        dialect: 'mailbox',
        path: '/template/apps/mailbox',
        icon: 'menu-template-mailbox',
      },
      {
        type: 'C',
        menuKey: 'todolist',
        dialect: 'todolist',
        path: '/template/apps/todolist',
        icon: 'menu-template-todolist',
      },
      {
        type: 'C',
        menuKey: 'notes',
        dialect: 'notes',
        path: '/template/apps/notes',
        icon: 'menu-template-notes',
      },
      {
        type: 'C',
        menuKey: 'scrumboard',
        dialect: 'scrumboard',
        path: '/template/apps/scrumboard',
        icon: 'menu-template-scrumboard',
      },
      {
        type: 'C',
        menuKey: 'contacts',
        dialect: 'contacts',
        path: '/template/apps/contacts',
        icon: 'menu-template-contacts',
      },
      {
        type: 'C',
        menuKey: 'invoice',
        dialect: 'invoice',
        icon: 'menu-template-invoice',
        children: [
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'list',
            dialect: 'list',
            path: '/template/apps/invoice/list'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'preview',
            dialect: 'preview',
            path: '/template/apps/invoice/preview'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'add',
            dialect: 'add',
            path: '/template/apps/invoice/add'
          },
          {
            type: 'C',
            parentKey: 'invoice',
            menuKey: 'edit',
            dialect: 'edit',
            path: '/template/apps/invoice/edit'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'calendar',
        dialect: 'calendar',
        path: '/template/apps/calendar',
        icon: 'menu-template-calendar',
      },
    ]
  },
  // User Interface
  {
    type: 'M',
    dialect: 'user_interface',
    children: [
      {
        type: 'C',
        menuKey: 'components',
        dialect: 'components',
        icon: 'menu-template-components',
        children: [
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'tabs',
            dialect: 'tabs',
            path: '/template/components/tabs'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'accordions',
            dialect: 'accordions',
            path: '/template/components/accordions'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'modals',
            dialect: 'modals',
            path: '/template/components/modals'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'cards',
            dialect: 'cards',
            path: '/template/components/cards'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'carousel',
            dialect: 'carousel',
            path: '/template/components/carousel'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'countdown',
            dialect: 'countdown',
            path: '/template/components/countdown'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'counter',
            dialect: 'counter',
            path: '/template/components/counter'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'sweetalert',
            dialect: 'sweetalert',
            path: '/template/components/sweetalert'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'timeline',
            dialect: 'timeline',
            path: '/template/components/timeline'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'notifications',
            dialect: 'notifications',
            path: '/template/components/notifications'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'media_object',
            dialect: 'media_object',
            path: '/template/components/media-object'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'list_group',
            dialect: 'list_group',
            path: '/template/components/list-group'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'pricing_table',
            dialect: 'pricing_table',
            path: '/template/components/pricing-table'
          },
          {
            type: 'C',
            parentKey: 'components',
            menuKey: 'lightbox',
            dialect: 'lightbox',
            path: '/template/components/lightbox'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'elements',
        dialect: 'elements',
        icon: 'menu-template-elements',
        children: [
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'alerts',
            dialect: 'alerts',
            path: '/template/elements/alerts'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'avatar',
            dialect: 'avatar',
            path: '/template/elements/avatar'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'badges',
            dialect: 'badges',
            path: '/template/elements/badges'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'breadcrumbs',
            dialect: 'breadcrumbs',
            path: '/template/elements/breadcrumbs'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'buttons',
            dialect: 'buttons',
            path: '/template/elements/buttons'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'button_groups',
            dialect: 'button_groups',
            path: '/template/elements/button-groups'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'color_library',
            dialect: 'color_library',
            path: '/template/elements/color-library'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'dropdown',
            dialect: 'dropdown',
            path: '/template/elements/dropdown'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'infobox',
            dialect: 'infobox',
            path: '/template/elements/infobox'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'jumbotron',
            dialect: 'jumbotron',
            path: '/template/elements/jumbotron'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'loader',
            dialect: 'loader',
            path: '/template/elements/loader'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'pagination',
            dialect: 'pagination',
            path: '/template/elements/pagination'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'popovers',
            dialect: 'popovers',
            path: '/template/elements/popovers'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'progress_bar',
            dialect: 'progress_bar',
            path: '/template/elements/progress-bar'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'search',
            dialect: 'search',
            path: '/template/elements/search'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'tooltips',
            dialect: 'tooltips',
            path: '/template/elements/tooltips'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'treeview',
            dialect: 'treeview',
            path: '/template/elements/treeview'
          },
          {
            type: 'C',
            parentKey: 'elements',
            menuKey: 'typography',
            dialect: 'typography',
            path: '/template/elements/typography'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'more',
        dialect: 'more',
        icon: 'menu-template-more',
        children: [
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'charts',
            dialect: 'charts',
            path: '/template/more/charts'
          },
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'font_icons',
            dialect: 'font_icons',
            path: '/template/more/font-icons'
          },
          {
            type: 'C',
            parentKey: 'more',
            menuKey: 'drag_and_drop',
            dialect: 'drag_and_drop',
            path: '/template/more/dragndrop'
          },
        ]
      },
    ]
  },
  // tables_and_forms
  {
    type: 'M',
    dialect: 'tables_and_forms',
    children: [
      {
        type: 'C',
        menuKey: 'tables',
        dialect: 'tables',
        icon: 'menu-template-tables',
        path: '/template/tables'
      },
      {
        type: 'C',
        menuKey: 'datatables',
        dialect: 'datatables',
        icon: 'menu-template-datatables',
        children: [
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_basic',
            dialect: 'basic',
            path: '/template/datatables/basic'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_advanced',
            dialect: 'advanced',
            path: '/template/datatables/advanced'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_skin',
            dialect: 'skin',
            path: '/template/datatables/skin'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_order_sorting',
            dialect: 'order_sorting',
            path: '/template/datatables/order-sorting'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_multi_column',
            dialect: 'multi_column',
            path: '/template/datatables/multi-column'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_multiple_tables',
            dialect: 'multiple_tables',
            path: '/template/datatables/multiple-tables'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_alt_pagination',
            dialect: 'alt_pagination',
            path: '/template/datatables/alt-pagination'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_checkbox',
            dialect: 'checkbox',
            path: '/template/datatables/checkbox'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_range_search',
            dialect: 'range_search',
            path: '/template/datatables/range-search'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_export',
            dialect: 'export',
            path: '/template/datatables/export'
          },
          {
            type: 'C',
            parentKey: 'datatables',
            menuKey: 'datatables_column_chooser',
            dialect: 'column_chooser',
            path: '/template/datatables/column-chooser'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'forms',
        dialect: 'forms',
        icon: 'menu-template-forms',
        children: [
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_basic',
            dialect: 'basic',
            path: '/template/forms/basic'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_input_group',
            dialect: 'input_group',
            path: '/template/forms/input-group'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_layouts',
            dialect: 'layouts',
            path: '/template/forms/layouts'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_validation',
            dialect: 'validation',
            path: '/template/forms/validation'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_input_mask',
            dialect: 'input_mask',
            path: '/template/forms/input-mask'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_select2',
            dialect: 'select2',
            path: '/template/forms/select2'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_touchspin',
            dialect: 'touchspin',
            path: '/template/forms/touchspin'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_checkbox_and_radio',
            dialect: 'checkbox_and_radio',
            path: '/template/forms/checkbox-radio'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_switches',
            dialect: 'switches',
            path: '/template/forms/switches'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_wizards',
            dialect: 'wizards',
            path: '/template/forms/wizards'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_file_upload',
            dialect: 'file_upload',
            path: '/template/forms/file-upload'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_quill_editor',
            dialect: 'quill_editor',
            path: '/template/forms/quill-editor'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_date_and_range_picker',
            dialect: 'date_and_range_picker',
            path: '/template/forms/date-picker'
          },
          {
            type: 'C',
            parentKey: 'forms',
            menuKey: 'forms_clipboard',
            dialect: 'clipboard',
            path: '/template/forms/clipboard'
          }
        ]
      }
    ]
  },
  // user_and_pages
  {
    type: 'M',
    dialect: 'user_and_pages',
    children: [
      {
        type: 'C',
        menuKey: 'users',
        dialect: 'users',
        icon: 'menu-template-users',
        children: [
          {
            type: 'C',
            parentKey: 'users',
            menuKey: 'profile',
            dialect: 'profile',
            path: '/template/users/profile'
          },
          {
            type: 'C',
            parentKey: 'users',
            menuKey: 'account_settings',
            dialect: 'account_settings',
            path: '/template/users/user-account-settings'
          },
        ]
      },
      {
        type: 'C',
        menuKey: 'pages',
        dialect: 'pages',
        icon: 'menu-template-pages',
        children: [
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'knowledge_base',
            dialect: 'knowledge_base',
            path: '/template/pages/knowledge-base'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'contact_us_boxed',
            dialect: 'contact_us_boxed',
            layout: 'blank',
            path: '/template/pages/contact-us-boxed'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'contact_us_cover',
            dialect: 'contact_us_cover',
            layout: 'blank',
            path: '/template/pages/contact-us-cover'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'coming_soon_boxed',
            dialect: 'coming_soon_boxed',
            layout: 'blank',
            path: '/template/pages/coming-soon-boxed'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'coming_soon_cover',
            dialect: 'coming_soon_cover',
            layout: 'blank',
            path: '/template/pages/coming-soon-cover'
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'error',
            dialect: 'error',
            children: [
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '404',
                dialect: '404',
                layout: 'blank',
                path: '/template/pages/error404'
              },
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '500',
                dialect: '500',
                layout: 'blank',
                path: '/template/pages/error500'
              },
              {
                type: 'C',
                parentKey: 'error',
                menuKey: '503',
                dialect: '503',
                layout: 'blank',
                path: '/template/pages/error503'
              }
            ]
          },
          {
            type: 'C',
            parentKey: 'pages',
            menuKey: 'maintenence',
            dialect: 'maintenence',
            layout: 'blank',
            path: '/template/pages/maintenence'
          }
        ]
      },
      {
        type: 'C',
        menuKey: 'authentication',
        dialect: 'authentication',
        icon: 'menu-template-authentication',
        children: [
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'login_boxed',
            dialect: 'login_boxed',
            layout: 'blank',
            path: '/template/auth/boxed-signin'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'register_boxed',
            dialect: 'register_boxed',
            layout: 'blank',
            path: '/template/auth/boxed-signup'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'unlock_boxed',
            dialect: 'unlock_boxed',
            layout: 'blank',
            path: '/template/auth/boxed-password-reset'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'login_cover',
            dialect: 'login_cover',
            layout: 'blank',
            path: '/template/auth/cover-login'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'register_cover',
            dialect: 'register_cover',
            layout: 'blank',
            path: '/template/auth/cover-register'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'unlock_cover',
            dialect: 'unlock_cover',
            layout: 'blank',
            path: '/template/auth/cover-lockscreen'
          },
          {
            type: 'C',
            parentKey: 'authentication',
            menuKey: 'recover_id_cover',
            dialect: 'recover_id_cover',
            layout: 'blank',
            path: '/template/auth/cover-password-reset'
          },
        ]
      },
    ]
  }
]

export const TemplateMenuList: Menu[] = flatMenuTree2MenuList(TemplateMenuTree)