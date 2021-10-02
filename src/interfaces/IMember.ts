export interface premium {
  active: true
  expiration: Date
  level: number
  vipRole: string
  vipCall: string
}

export default interface IMember {
  id: string
  premium: premium
}
