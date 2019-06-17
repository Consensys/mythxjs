# MythX JS Library

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

MythXJS is a Javascript based library for the [Mythx](https://mythx.io/) smart contract security analysis platform.

The library works out of the box on Node and modern browsers.

## Installation

```
npm install mythxjs
```

## Example

Creating a new instance of the library using ES6 modules

```
import { Client } from 'mythxjs'

const mythx = new Client('0x0000000000000000000000000000000000000000', 'trial', 'testTool');
```

Performing a `login` request

```
// Logs in and returns an object containing access and refresh token
const tokens = await mythx.login()

```

Submitting an analysis using bytecode only

```
const bytecode = '0xfe'
await mythx.submitBytecode(bytecode)
```

Getting a list of detected issues

```
await mythx.getDetectedIssues('1111-2222-3333-4444')
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/ConsenSys/mythxjs/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

For the versions available, see [the tags on this repository](https://github.com/ConsenSys/mythxjs/tags).

## Projects using MythxJS

TBA

## See also

-   [openapi spec](https://api.mythx.io/v1/openapi) for details of the MythX API.
-   [MythX Developer and User Guide](https://docs.mythx.io/) for more information
-   [MythX Discord channel](https://discord.gg/kktn8Wt) to join the MythX community.
