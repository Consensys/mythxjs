import { expect, test } from '@oclif/test'

describe('logout', () => {
  test
    .stdout()
    .command(['logout'])
    .it('runs logout', ctx => {
      expect(ctx.stdout).to.contain('Successfully logged out of MythX')
    })
})
