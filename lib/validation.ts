"use client";

import * as Yup from 'yup'
import { i18next } from '@/i18n/client';

i18next.setDefaultNamespace("admin_common");

Yup.setLocale({
  mixed: {
    default: () => i18next.t('validation_error.field_invalid'),
    required: () => i18next.t('validation_error.field_required'),
  },
  string: {
    matches: () => i18next.t('validation_error.field_invalid'),
  },
  number: {

  },
  array: {
    min: () => i18next.t('validation_error.field_length_invalid'),
    max: () => i18next.t('validation_error.field_length_invalid'),
    length: () => i18next.t('validation_error.field_length_invalid')
  }
})
export default Yup
