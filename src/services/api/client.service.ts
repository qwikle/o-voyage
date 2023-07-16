import apiService, { type ApiInterface } from '../api/api.service'
export class ClientService {
  client: ApiInterface = apiService
}
