import { defineStore } from 'pinia'
import { type ICategory } from '@/models'
import categoryService from '@/services/category/category.service'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[]
  }),
  actions: {
    async getCategories() {
      this.categories = await categoryService.getCategories()
    }
  }
})
