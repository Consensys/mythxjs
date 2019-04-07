import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import Auth from '../Auth'

// Constants
import { DEFAULT_ETH_ADDRESS, DEFAULT_PASSWORD } from '../constants'

export default class Login extends Command {
  public static description = 'Login to your MythX account'

  public static examples = [
    `$ mythxjs login
Please enter your Ethereum address [${DEFAULT_ETH_ADDRESS}]:
Please enter your MythX password [${DEFAULT_PASSWORD}]:
Logging in... Successfully logged in as ${DEFAULT_ETH_ADDRESS}
    `
  ]

  public static flags = {
    // flag with a value (-a, --address=0x0000000000000000000000000000000000000000)
    address: flags.string({ char: 'a', description: 'Ethereum address' }),

    help: flags.help({ char: 'h' }),

    // flag with a value (-a, --address=trial)
    password: flags.string({ char: 'p', description: 'MythX password' })
  }

  public static args = [{ name: 'address' }, { name: 'password' }]

  public async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(Login)

    let address = args.address || flags.address || process.env.MYTHX_ETH_ADDRESS
    let password = args.password || flags.password || process.env.MYTHX_PASSWORD

    const auth = new Auth()

    if (!auth.isLoggedIn()) {
      if (!address) {
        // Prompt for Ethereum address
        address =
          (await cli.prompt(
            `Please enter your Ethereum address [${DEFAULT_ETH_ADDRESS}]`,
            { required: false }
          )) || DEFAULT_ETH_ADDRESS
      }

      if (!password) {
        // Prompt for MythX password
        password =
          (await cli.prompt(
            `Please enter your MythX password [${DEFAULT_PASSWORD}]`,
            {
              required: false
            }
          )) || DEFAULT_PASSWORD
      }

      // show on stdout instead of stderr
      cli.action.start('Logging in', undefined, { stdout: true })

      auth.ethAddress = address
      auth.password = password

      try {
        await auth.login()
        cli.action.stop(`Successfully logged in as ${auth.ethAddress}`)
      } catch (e) {
        cli.action.stop(e.message)
      }
    } else {
      this.log(`Already logged in as ${auth.ethAddress}`)
    }
  }
}
