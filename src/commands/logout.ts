import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import Auth from '../Auth'

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

    const auth = new Auth()

    cli.action.start('Logging out', undefined, { stdout: true })

    if (!auth.isLoggedIn()) {
      this.error(`Please login to MythX via login command`)
    } else {
      try {
        await auth.logout()
        cli.action.stop(`Successfully logged out as ${auth.ethAddress}`)
      } catch (e) {
        cli.action.stop(e.message)
      }
    }
  }
}
