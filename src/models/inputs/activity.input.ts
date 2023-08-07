export interface IActivityInput {
  name: string
  price: number
  location: string
  members: number
  time: string
  date: string
  categoryId: number
  travelId: number
}

export class ActivityInput implements IActivityInput {
  name: string
  price: number
  location: string
  members: number
  time: string
  date: string
  categoryId: number
  travelId: number

  constructor(activity: IActivityInput) {
    this.name = activity.name
    this.price = activity.price
    this.location = activity.location
    this.members = activity.members
    this.time = activity.time
    this.date = activity.date
    this.categoryId = activity.categoryId
    this.travelId = activity.travelId
  }

  static toJSON(activity: IActivityInput): ActivityInput {
    return new ActivityInput({
      name: activity.name,
      price: Number(activity.price),
      location: activity.location,
      members: Number(activity.members),
      time: activity.time,
      date: activity.date,
      categoryId: Number(activity.categoryId),
      travelId: Number(activity.travelId)
    })
  }
}
