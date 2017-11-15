import makeMeASandwich from '../make-me-a-sandwich';

test('returns null if the sandwitch does not exists', () => {
  const req = {query: {}}
  const result = makeMeASandwich(req)

  expect(result).toBeNull()
})

test('returns my sandwitch', () => {
  const sandwich = 'Monte Cristo'
  const req = getReq(sandwich)
  const result = makeMeASandwich(req)
  expect(result).toBe(sandwich)
})

function getReq(sandwich) {
  return {query: {sandwich}}
}