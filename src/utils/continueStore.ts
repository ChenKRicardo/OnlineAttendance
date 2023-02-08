import { useUserStore } from '@/store/user';
import { createPinia, PiniaPluginContext } from 'pinia';
import { toRaw } from 'vue'

type Options = {
  key?: string
}
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStroage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}
const defaultKey: string = 'chenkang'
const piniaPlugin = (Options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStroage(`${Options?.key ?? defaultKey}_${store.$id}`)
    store.$subscribe(() => {
      setStorage(`${Options?.key ?? defaultKey}_${store.$id}`, toRaw(store.$state))
    })
    return {
      ...data
    }
  }
}
const pinia = createPinia()
pinia.use(piniaPlugin({ key: 'aili' }))
export default pinia