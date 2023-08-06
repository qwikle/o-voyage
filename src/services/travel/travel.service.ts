import { Travel } from '@/models'
import { ClientService } from '../api/client.service'
import type { TravelInput } from '@/models/inputs/travel.input'

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
      activities {
      id
      name
      price
      location
      members
      date
      time
      categoryId
      category {
        id
        name
      }
    }
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
    })) as unknown as { me: { travels: Travel[] } }
    return me.travels.map((travel) => new Travel(travel))
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
    })) as unknown as { createTravel: Travel }
    return new Travel(createTravel)
  }

  async getTravelBySlug(slug: string): Promise<Travel | null> {
    const { travelBySlug } = (await this.client.query({
      query: `
      query Query($slug: String!) {
  travelBySlug(slug: $slug) {
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
    travelers {
      id
      firstname
      lastname
      email
    }
    organizer {
      id
      firstname
      lastname
      email
    }
    invitationLink
    activities {
      id
      name
      price
      location
      members
      date
      time
      categoryId
      category {
        id
        name
      }
    }
  }
}
      `,
      variables: { slug }
    })) as unknown as {
      travelBySlug: Travel
    }
    return travelBySlug ? new Travel(travelBySlug) : null
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
