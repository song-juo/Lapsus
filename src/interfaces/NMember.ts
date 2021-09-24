interface premium {
  active: true
  expiration: Date
  level: number
}

export default interface NMember {
  memberID: string
  premium: premium,

}
