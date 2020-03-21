import bent from 'bent'
import { createServer } from '../src/index'

const getText = bent('string')

test('Request & Response', async () => {
  const handler = async (req, res) => res.end('eiyo')
  const address = await createServer(handler)

  expect(await getText(address)).toBe('eiyo')

  await expect(getText(address)).rejects.toThrow(/ECONNREFUSED/)
})

test('Multi requests', async () => {
  const handler = async (req, res) => res.end('eiyo')
  const address = await createServer(handler, 3)

  expect(await getText(address)).toBe('eiyo')
  expect(await getText(address)).toBe('eiyo')
  expect(await getText(address)).toBe('eiyo')

  await expect(getText(address)).rejects.toThrow(/ECONNREFUSED/)
})
