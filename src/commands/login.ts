import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

export default class Login extends Command {
  public static description = 'Login to your MythX account'

  public static examples = [
    `$ mythxjs login
Please enter your Ethereum address [0x0000000000000000000000000000000000000000]:
Please enter your MythX password [trial]:
Successfully logged in as 0x0000000000000000000000000000000000000000
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

    let address = args.address || flags.address
    let password = args.password || flags.password

    if (!address) {
      // Prompt for Ethereum address
      address =
        (await cli.prompt(
          'Please enter your Ethereum address [0x0000000000000000000000000000000000000000]',
          { required: false }
        )) || '0x0000000000000000000000000000000000000000'
    }

    if (!password) {
      // Prompt for MythX password
      password =
        (await cli.prompt('Please enter your MythX password [trial]', {
          required: false
        })) || 'trial'
    }

    this.log(`Successfully logged in as ${address}`)
  }
}
