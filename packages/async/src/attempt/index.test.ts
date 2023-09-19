import attempt from '.'

test('basic call', async () => {
  const start = Date.now()
  const result = await attempt(async () => true)
  const end = Date.now() - start

  expect(result).toBe(true)
  expect(end).toBeGreaterThanOrEqual(0)
  expect(end).toBeLessThanOrEqual(200)
})

test('try 3 times', async () => {
  const retries: number[] = []

  let i = 1

  const start = Date.now()
  const result = await attempt(
    {
      numRetries: 2,
      delayAfterEachTry: 500
    },
    async () => {
      retries.push(i)

      if (i++ < 3) {
        throw new Error()
      }

      return i
    }
  )
  const end = Date.now() - start

  expect(result).toBe(4)
  expect(retries).toEqual([1, 2, 3])
  expect(end).toBeGreaterThanOrEqual(800)
  expect(end).toBeLessThanOrEqual(1200)
})

test('slow try 3 times with initial delay', async () => {
  const retries: number[] = []

  let i = 1

  const start = Date.now()
  const result = await attempt(
    {
      numRetries: 2,
      initialDelay: 1000,
      delayAfterEachTry: 1000
    },
    async () => {
      retries.push(i)

      if (i++ < 3) {
        throw new Error()
      }

      return i
    }
  )
  const end = Date.now() - start

  expect(result).toBe(4)
  expect(retries).toEqual([1, 2, 3])
  expect(end).toBeGreaterThanOrEqual(2800)
  expect(end).toBeLessThanOrEqual(3200)
})
