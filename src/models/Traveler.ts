export interface ITraveler {
  id: number
  firstname: string
  lastname: string
  email: string
  fullname: string
}

export class Traveler implements ITraveler {
  id: number
  firstname: string
  lastname: string
  email: string

  constructor(traveler: ITraveler) {
    this.id = traveler.id
    this.firstname = traveler.firstname
    this.lastname = traveler.lastname
    this.email = traveler.email
  }

  get fullname(): string {
    return `${this.firstname} ${this.lastname}`
  }
}
