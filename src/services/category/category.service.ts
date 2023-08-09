import { type ICategory } from '@/models'
import { ClientService } from '@/services/api/client.service'

class CategoryService extends ClientService {
  async getCategories(): Promise<ICategory[]> {
    const { categories } = (await this.client.query({
      query: `query Categories {
  categories {
    name
    id
  }
}`
    })) as unknown as { categories: ICategory[] }
    return categories
  }
}

export default new CategoryService()
