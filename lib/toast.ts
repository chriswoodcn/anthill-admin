import { store } from '@/store';
import { ReactElement } from 'react';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const WithContentSwal = withReactContent(Swal)
const isDark = () => store.getState().adminSetting.theme === 'dark' || store.getState().adminSetting.isDarkMode;

interface ToastOptions {
  title?: ReactElement | string
  icon?: SweetAlertIcon
  html?: ReactElement | string
  confirmButtonText?: ReactElement | string
  denyButtonText?: ReactElement | string
  cancelButtonText?: ReactElement | string
  footer?: ReactElement | string
  closeButtonHtml?: ReactElement | string
  iconHtml?: ReactElement | string
  loaderHtml?: ReactElement | string
  timer?: number
  position?: SweetAlertPosition
  callback?: Function
  cancel?: Function
  dismiss?: Function
}

const Toast = {
  fire: (options: ToastOptions) => WithContentSwal.fire(options),
  fireSuccessAction: (options: ToastOptions) => {
    WithContentSwal.close()
    WithContentSwal.fire({
      showConfirmButton: false,
      position: options.position || 'top',
      timer: options.timer != undefined ? options.timer : 1500,
      icon: 'success',
      title: options.title,
      padding: '1em',
      html: options.html,
      iconHtml: options.iconHtml,
      background: isDark() ? "#172741" : "#ffffff",
      customClass: { htmlContainer: 'fire_toast_html_container' }
    }).then(() => {
      options.callback && options.callback()
    })
  },
  fireWarnAction: (options: ToastOptions) => {
    WithContentSwal.close()
    WithContentSwal.fire({
      showConfirmButton: false,
      position: options.position || 'top',
      timer: options.timer != undefined ? options.timer : 1500,
      icon: 'warning',
      title: options.title,
      padding: '1em',
      html: options.html,
      iconHtml: options.iconHtml,
      background: isDark() ? "#172741" : "#ffffff",
      customClass: { htmlContainer: 'fire_toast_html_container' }
    }).then(() => {
      options.callback && options.callback()
    })
  },
  fireErrorAction: (options: ToastOptions) => {
    WithContentSwal.close()
    WithContentSwal.fire({
      showConfirmButton: false,
      position: options.position || 'top',
      timer: options.timer != undefined ? options.timer : 1500,
      icon: 'error',
      title: options.title,
      padding: '1em',
      html: options.html,
      iconHtml: options.iconHtml,
      background: isDark() ? "#172741" : "#ffffff",
      customClass: { htmlContainer: 'fire_toast_html_container' }
    }).then(() => {
      options.callback && options.callback()
    })
  }

}

export default Toast
