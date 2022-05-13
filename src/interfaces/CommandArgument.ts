interface CommandArgument {
    name: string
    type: 'member' | 'role' | 'channel'
    optional: boolean
    position: number
}

export default CommandArgument;
