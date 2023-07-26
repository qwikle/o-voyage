import { Traveler, type ITraveler } from './Traveler'
import { DateTime } from 'luxon'
import type { IActivity } from './activity'
export interface ITravel {
  id: number
  title: string
  slug: string
  from: string
  to: string
  numberOfTravelers: number
  departureDate: string
  arrivalDate: string
  budget: number
  organizerId: number
  invitationLink?: string
  activities: IActivity[]
  travelers: ITraveler[]
  status: string
  organizer: ITraveler
  departureDateFormatted: string
  arrivalDateFormatted: string
}

export class Travel implements ITravel {
  id: number
  title: string
  slug: string
  from: string
  to: string
  numberOfTravelers: number
  departureDate: string
  arrivalDate: string
  budget: number
  organizerId: number
  invitationLink?: string | undefined
  activities: IActivity[] = []
  travelers: ITraveler[] = []
  dateList: {
    day: number
    date: string
    value: string
  }[]

  constructor(travel: ITravel) {
    this.id = travel.id
    this.title = travel.title
    this.slug = travel.slug
    this.from = travel.from
    this.to = travel.to
    this.numberOfTravelers = travel.numberOfTravelers
    this.departureDate = travel.departureDate
    this.arrivalDate = travel.arrivalDate
    this.budget = travel.budget
    this.organizerId = travel.organizerId
    this.invitationLink = travel.invitationLink
    this.travelers = travel.travelers.filter((traveler) => new Traveler(traveler))
    this.dateList = this.getListOfDatesFromTwoDates(travel.departureDate, travel.arrivalDate)
    this.activities = travel.activities
  }

  get status(): string {
    const now = new Date()
    const departureDate = new Date(this.departureDate)
    const arrivalDate = new Date(this.arrivalDate)

    if (now < departureDate) {
      return 'ongoing'
    }
    if (now >= departureDate && now <= arrivalDate) {
      return 'pending'
    }

    return 'finished'
  }

  get departureDateFormatted(): string {
    const date = new Date(this.departureDate)
    return date.toLocaleDateString('fr-FR')
  }

  get arrivalDateFormatted(): string {
    const date = new Date(this.arrivalDate)
    return date.toLocaleDateString('fr-FR')
  }

  get organizer(): ITraveler {
    const traveler = this.travelers.find(
      (traveler) => traveler.id === this.organizerId
    ) as ITraveler

    return new Traveler(traveler)
  }

  getListOfDatesFromTwoDates(startDate: string, stopDate: string) {
    const dateArray = []
    let currentDate = DateTime.fromISO(startDate)
    while (currentDate <= DateTime.fromISO(stopDate)) {
      const value = currentDate.toFormat('yyyy-MM-dd')
      const date = currentDate.toFormat('dd/MM/yyyy')
      dateArray.push({
        day: dateArray.length + 1,
        date,
        value
      })
      currentDate = currentDate.plus({ days: 1 })
    }
    return dateArray
  }
}
