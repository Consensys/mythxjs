import { Command, flags } from '@oclif/command'
import Table = require('cli-table')
import cli from 'cli-ux'

// Service
import { getVersion } from '../services/version'

export default class Info extends Command {
  public static description = 'Version information of Mythxjs and the API'

  public static examples = [
    `$ mythxjs info
Fetching info... done
    `
  ]

  public static flags = {
    help: flags.help({ char: 'h' })
  }

  public static args = []

  public async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(Info)

    cli.action.start('Fetching info', undefined, { stdout: true })

    getVersion()
      .then(response => {
        cli.action.stop()

        const { data } = response

        const table = new Table({
          head: ['API', 'Harvey', 'Maestro', 'Maru', 'Mythril', 'Hash']
        })

        table.push([
          data.api,
          data.harvey,
          data.maestro,
          data.maru,
          data.mythril,
          data.hash
        ])

        this.log(table.toString())
      })
      .catch(err => {
        cli.action.stop(err.response.data.error)
      })
  }
}
