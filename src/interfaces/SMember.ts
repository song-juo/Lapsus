export interface premium {
  active: true
  expiration: Date
  level: number
  vipRole: string
  vipCall: string
}

export interface SMember {
  id: string
  premium: premium
}
