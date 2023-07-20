export interface ITravelInput {
  title: string
  to: string
  departureDate: string
  arrivalDate: string
  budget: number
  numberOfTravelers: number
  organizerId?: number
}

export class TravelInput implements ITravelInput {
  title: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  budget: number
  numberOfTravelers: number
  organizerId?: number

  constructor(travel: ITravelInput) {
    this.title = travel.title
    this.from = 'France'
    this.to = travel.to
    this.departureDate = travel.departureDate
    this.arrivalDate = travel.arrivalDate
    this.budget = travel.budget
    this.numberOfTravelers = travel.numberOfTravelers
    this.organizerId = travel.organizerId
  }

  static toJSON(travel: ITravelInput): TravelInput {
    return new TravelInput({
      title: travel.title,
      to: travel.to,
      departureDate: travel.departureDate,
      arrivalDate: travel.arrivalDate,
      budget: Number(travel.budget),
      numberOfTravelers: Number(travel.numberOfTravelers),
      organizerId: travel.organizerId
    })
  }
}
