import delay from '.'

test('delay', async () => {
  let start: number
  let end: number

  start = Date.now()
  await delay(1000)
  end = Date.now() - start

  expect(end).toBeGreaterThanOrEqual(800)
  expect(end).toBeLessThanOrEqual(1200)

  start = Date.now()
  await delay('1500')
  end = Date.now() - start

  expect(end).toBeGreaterThanOrEqual(1300)
  expect(end).toBeLessThanOrEqual(1700)

  start = Date.now()
  await delay('1.5s')
  end = Date.now() - start

  expect(end).toBeGreaterThanOrEqual(1300)
  expect(end).toBeLessThanOrEqual(1700)
})
