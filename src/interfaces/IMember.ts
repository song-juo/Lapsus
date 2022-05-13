export interface premium {
  active: true
  expiration: Date
  level: number
  vipRole: string
  vipCall: string
}

export interface IMember {
  id: string
  premium: premium
}
