import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import Auth from '../Auth'

export default class Refresh extends Command {
  public static description = 'Refresh your MythX API token'

  public static examples = [
    `$ mythxjs refresh
Refreshing token... Successfully refreshed MythX API token
    `
  ]

  public static flags = {
    help: flags.help({ char: 'h' })
  }

  public static args = []

  public async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(Refresh)

    const auth = new Auth()

    cli.action.start('Refreshing token', undefined, { stdout: true })

    if (!auth.isLoggedIn()) {
      this.error(`Please login to MythX via login command`)
    } else {
      try {
        await auth.refresh()
        cli.action.stop(`Successfully refreshed MythX API token`)
      } catch (e) {
        cli.action.stop(e.message)
      }
    }
  }
}
