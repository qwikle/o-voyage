import type { IActivity } from '@/models'
import { Activity } from '@/models/activity'
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
}

export default new ActivityService()
