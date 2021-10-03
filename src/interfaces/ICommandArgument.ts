export default interface ICommandArgument {
    name: string
    type: 'member' | 'role' | 'channel'
    optional: boolean
    position: number
}
