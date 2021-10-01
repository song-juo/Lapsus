interface premium {
  active: true
  expiration: Date
  level: number
  vipRole: string
  vipCall: string
}

export default interface IMember {
  memberID: string
  premium: premium
}
