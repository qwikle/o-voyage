import apiService, { type ApiInterface } from '@/services/api/api.service'
export class ClientService {
  client: ApiInterface = apiService
}
