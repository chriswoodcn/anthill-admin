import configuraton from '@/configuration.mjs'
import { useState } from 'react'
import useEffectOnce from './useEffectOnce'


export default function useTitle(initialTitle: string | undefined) {
  const [title, setTitle] = useState(initialTitle)
  const updateTitle = () => {
    document.title = title || configuraton.AppName
  }
  useEffectOnce(updateTitle, [title])
  return setTitle
}
