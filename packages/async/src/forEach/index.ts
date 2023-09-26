// TODO: handle strings, objects, array-likes
// TODO: handle generators, iterables, (both sync/async)

async function asyncForEach<T extends ArrayLike<unknown>> (
  array: T,
  callbackfn: (value: T[number], index: number, array: T) => Promise<void>
): Promise<void>

async function asyncForEach (
  array: any,
  callbackfn: (value: any, index: number, array: any) => Promise<any>
): Promise<void> {
  let i = 0

  for await (const item of array) {
    await callbackfn(item, i, array)
    i++
  }
}

export default asyncForEach
