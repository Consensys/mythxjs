import { expect, test } from '@oclif/test'

describe('login', () => {
  test
    .stdout()
    .command(['login', '0x2858b141429244dDA03354AA35F1Cc761a058a34', 'mythxjs'])
    .it(
      'runs login 0x2858b141429244dDA03354AA35F1Cc761a058a34 mythxjs',
      ctx => {
        expect(ctx.stdout).to.contain(
          'Successfully logged in as 0x2858b141429244dDA03354AA35F1Cc761a058a34'
        )
      }
    )

  test
    .stdout()
    .command([
      'login',
      '--address',
      '0x2858b141429244dDA03354AA35F1Cc761a058a34',
      '--password',
      'mythxjs'
    ])
    .it(
      'runs login --address 0x2858b141429244dDA03354AA35F1Cc761a058a34 --password mythxjs',
      ctx => {
        expect(ctx.stdout).to.contain(
          'Successfully logged in as 0x2858b141429244dDA03354AA35F1Cc761a058a34'
        )
      }
    )
})
