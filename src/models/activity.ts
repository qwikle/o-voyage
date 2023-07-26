import type { ITravel, ICategory } from '.'

export interface IActivity {
  id: number
  name: string
  price: number
  location: string
  members: number
  time: string
  date: string
  travelId: number
  categoryId: number
  travel: ITravel
  category: ICategory
}
