import type { ITravel, ICategory } from '@/models'
import { DateTime } from 'luxon'

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
  travel?: ITravel
  category?: ICategory
}

export class Activity implements IActivity {
  id: number
  name: string
  price: number
  location: string
  members: number
  time: string
  date: string
  travelId: number
  categoryId: number
  travel?: ITravel
  category?: ICategory

  constructor(activity: IActivity) {
    this.id = activity.id
    this.name = activity.name
    this.price = activity.price
    this.location = activity.location
    this.members = activity.members
    this.time = DateTime.fromISO(activity.time).toFormat('HH:mm')
    this.date = activity.date
    this.travelId = activity.travelId
    this.categoryId = activity.categoryId
    this.travel = activity.travel
    this.category = activity.category
  }
}
