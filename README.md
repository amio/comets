# comets

[![npm version][npm-src]][npm-href]
[![package size][size-src]][size-href]

Create a one-off server for testing http request listener.

## Usage

```bash
npm install comets
```

```js
import assert from 'assert'
import fetch from 'node-fetch'
import { createServer } from 'comets'

async function test () {
  // The handler to test
  const requestHandler = (req, res) => res.end('yo')

  // Create a one-off server for testing
  const address = await createServer(requestHandler)

  // Send test request, the server will close after this request
  const result = await fetch(address).then(res => res.text())

  assert.equal(result, 'yo')
}
```

## API

### `createServer()`

`async createServer(handler: http.RequestListener, count: number = 1) => Promise<string>`

- __`handler`__: the request listener for creating http server
- __`count`__: the number of requests allowed before server closed (default: 1)

returns __`Promise<string>`__: the server address (`http://localhost:<PORT>`).

## License

[![License][license-src]][license-href]


[npm-src]: https://badgen.net/npm/v/comets
[npm-href]: https://www.npmjs.com/package/comets
[size-src]: https://badgen.net/packagephobia/install/comets
[size-href]: https://packagephobia.now.sh/result?p=comets
[license-src]: https://badgen.net/badge/license/MIT
[license-href]: LICENSE.md
