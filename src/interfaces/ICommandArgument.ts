interface ICommandArgument {
    name: string
    type: 'member' | 'role' | 'channel'
    optional: boolean
    position: number
}

export default ICommandArgument;
