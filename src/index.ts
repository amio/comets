import { Server } from 'http'
import type { RequestListener } from 'http'

/**
 * Create a one-off server for testing http request listener
 */
export async function createServer (handler: RequestListener, count = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = new Server(async (req, res) => {
      res.on('finish', checkServer)
      return handler(req, res)
    })

    function checkServer () {
      --count < 1 && server.close()
    }

    server.on('error', reject)

    server.listen(() => {
      const { port } = server.address() as any
      resolve(`http://localhost:${port}`)
    })
  })
}
