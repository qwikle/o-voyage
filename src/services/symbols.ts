import { type InjectionKey } from 'vue'
import { type ApiInterface } from './api/api.service'

export const ApiKey: InjectionKey<ApiInterface> = Symbol('Api')
