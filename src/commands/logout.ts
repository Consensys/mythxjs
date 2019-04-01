import { Command, flags } from '@oclif/command'

export default class Login extends Command {
  public static description = 'Logout of your MythX account'

  public static examples = [
    `$ mythxjs logout
Successfully logged out of MythX
    `
  ]

  public static flags = {
    help: flags.help({ char: 'h' })
  }

  public static args = []

  public async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(Login)

    this.log(`Successfully logged out of MythX`)
  }
}
