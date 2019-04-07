import { expect, test } from '@oclif/test'

// Constants
import { DEFAULT_ETH_ADDRESS, DEFAULT_PASSWORD } from '../../src/constants'

describe('login', () => {
  test
    .stdout()
    .command(['login', DEFAULT_ETH_ADDRESS, DEFAULT_PASSWORD])
    .timeout(30000)
    .it(`runs login ${DEFAULT_ETH_ADDRESS} ${DEFAULT_PASSWORD}`, ctx => {
      expect(ctx.stdout).to.contain(
        `Logging in... Successfully logged in as ${DEFAULT_ETH_ADDRESS}`
      )
    })
})
