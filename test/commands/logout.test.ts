import { expect, test } from '@oclif/test'

// Constants
import { DEFAULT_ETH_ADDRESS } from '../../src/constants'

describe('logout', () => {
  test
    .stdout()
    .command(['logout'])
    .timeout(30000)
    .it('runs logout', ctx => {
      expect(ctx.stdout).to.contain(
        `Logging out... Successfully logged out as ${DEFAULT_ETH_ADDRESS}`
      )
    })
})
