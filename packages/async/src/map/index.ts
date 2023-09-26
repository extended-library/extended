// TODO: handle strings, objects, array-likes
// TODO: handle generators, iterables, (both sync/async)

async function asyncMap<T extends ArrayLike<unknown>, U> (
  array: T,
  callbackfn: (value: T[number], index: number, array: T) => Promise<U>
): Promise<U[]>

async function asyncMap (
  array: any,
  callbackfn: (value: any, index: number, array: any) => Promise<any>
): Promise<any> {
  const result: any[] = []

  let i = 0

  for await (const item of array) {
    result.push(await callbackfn(item, i, array))
    i++
  }

  return result
}

export default asyncMap
