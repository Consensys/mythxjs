import { Command, flags } from '@oclif/command'
import Table = require('cli-table')
import cli from 'cli-ux'
import * as fs from 'fs'

import Auth from '../Auth'

// Types
import { IIssue } from '../../types'

// Constants
import { ANALYZE_API, API_URL } from '../constants'

// Service
import { analyze } from '../services/analysis'

export default class Analyze extends Command {
  public static description =
    'Submit a new analysis job based on source code or byte code'

  public static examples = [
    `$ mythxjs analyze -b examples/bytecode.txt
Fetching analysis... done
    `,
    `$ mythxjs analyze -s examples/token.sol
Fetching analysis... done
    `
  ]

  public static flags = {
    // flag with a value (-b, --bytecode=examples/bytecode.txt)
    bytecode: flags.string({ char: 'b', description: 'Path to bytecode file' }),

    help: flags.help({ char: 'h' }),

    // flag with a value (-s, --source=examples/token.sol)
    source: flags.string({
      char: 's',
      description: 'Path to solidity contract'
    })
  }

  public static args = []

  public async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(Analyze)

    const auth = new Auth()

    try {
      await auth.validateTokens()

      const bytecodeFile = args.bytecode || flags.bytecode
      const sourceFile = args.source || flags.source

      let bytecode
      let source

      if (bytecodeFile) {
        if (fs.existsSync(bytecodeFile)) {
          // TODO: Validate bytecode is in expected format /^(0x)?([0-9a-fA-F]{2})+$/
          bytecode = fs
            .readFileSync(bytecodeFile)
            .toString()
            .replace(/\n/g, '')
        } else {
          this.error(`Unable to locate bytecode file.`)
          return
        }
      }

      if (sourceFile) {
        if (fs.existsSync(sourceFile)) {
          // TODO: Compile source with `solc` and send the data to analyze
          source = fs.readFileSync(sourceFile).toString()
        } else {
          this.error(`Unable to locate source file.`)
          return
        }
      }

      cli.action.start('Fetching analysis', undefined, { stdout: true })

      const data = {
        analysisMode: 'quick',
        bytecode
      }

      const { issues } = (await analyze(
        data,
        auth.accessToken,
        API_URL.staging + ANALYZE_API
      ))[0]

      cli.action.stop()

      const table = new Table({
        head: ['Severity', 'SWC Title', 'Description']
      })

      issues.map((issue: IIssue) =>
        table.push([issue.severity, issue.swcTitle, issue.description.head])
      )

      this.log(table.toString())
    } catch (e) {
      this.error(e.message)
    }
  }
}
