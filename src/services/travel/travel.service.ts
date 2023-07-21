import { Travel, type ITravel } from '@/models'
import { ClientService } from '../api/client.service'
import type { TravelInput } from '@/models/inputs/travel.input'

class TravelService extends ClientService {
  async getTravelList(): Promise<ITravel[]> {
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
      travelers {
        id
        firstname
        lastname
        email
      }
    }
  }
}`,
      variables: {}
    })) as unknown as { me: { travels: ITravel[] } }
    return me.travels.map((travel) => new Travel(travel))
  }

  async createTravel(travel: TravelInput): Promise<ITravel> {
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
    organizerId
    travelers {
      id
      firstname
      lastname
      email
    }
  }
}`,
      variables: { createTravelInput: travel }
    })) as unknown as { createTravel: ITravel }
    return new Travel(createTravel)
  }

  async deleteTravel(travelId: number): Promise<boolean> {
    const { removeTravel } = (await this.client.mutation({
      query: `mutation Mutation($removeTravelId: Int!) {
    removeTravel(id: $removeTravelId)
  }`,
      variables: { removeTravelId: travelId }
    })) as unknown as { removeTravel: boolean }
    return removeTravel
  }
}

export default new TravelService()
