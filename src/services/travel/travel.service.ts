import type { Travel } from '@/models'
import { ClientService } from '../api/client.service'

class TravelService extends ClientService {
  async getTravelList(): Promise<Travel[]> {
    const { me } = (await this.client.query({
      query: `query Travel {
  me {
    travels {
      id
      title
      slug
      from
      to
      departureDate
      arrivalDate
      budget
      numberOfTravelers
      organizerId
      invitationLink
    }
  }
}`,
      variables: {}
    })) as unknown as { me: { travels: Travel[] } }
    return me.travels
  }

  async createTravel(travel: TravelInput): Promise<Travel> {
    const { createTravel } = (await this.client.mutation({
      query: `mutation Mutation($createTravelInput: CreateTravelInput!) {
  createTravel(createTravelInput: $createTravelInput) {
    id
    title
    slug
    from
    to
    departureDate
    arrivalDate
    budget
    numberOfTravelers
    invitationLink
  }
}`,
      variables: { createTravelInput: travel }
    })) as unknown as { createTravel: Travel }
    return createTravel
  }
}

export interface TravelInput {
  title: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  budget?: number
  numberOfTravelers: number
  organizerId?: number
}

export default new TravelService()
