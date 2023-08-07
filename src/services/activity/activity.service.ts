import { type IActivity, type IActivityInput, Activity } from '@/models'
import { ClientService } from '@/services/api/client.service'

class ActivityService extends ClientService {
  async getActivityByDate(date: string, travelId: number): Promise<IActivity[]> {
    const { activities } = (await this.client.query({
      query: `query Query($date: Date!, $activitiesByDateId: Int!) {
  activitiesByDate(date: $date, id: $activitiesByDateId) {
    id
    name
    price
    location
    members
    time
    travelId
    categoryId
  }
}`,
      variables: { date, activitiesByDateId: travelId }
    })) as unknown as { activities: IActivity[] }
    return activities ? activities.map((activity) => new Activity(activity)) : []
  }

  async createActivity(activity: IActivityInput): Promise<IActivity> {
    const { createActivity } = (await this.client.mutation({
      query: `mutation CreateActivity($createActivityInput: CreateActivityInput!) {
  createActivity(createActivityInput: $createActivityInput) {
    id
    name
    price
    location
    members
    time
    date
    travelId
    categoryId
  }
}`,
      variables: { createActivityInput: activity }
    })) as unknown as { createActivity: IActivity }
    return new Activity(createActivity)
  }
}

export default new ActivityService()
