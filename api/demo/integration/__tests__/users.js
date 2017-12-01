import axios from 'axios'
import startServer from '../start-server'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll((done) => {
  server.close(done)
})

test('can get users', async () => {
  const response = await api.get('users')
  const user = response.data.users[0]
  expect(user).toMatchObject({
    name: expect.any(String),
    username: expect.any(String),
  })
})

test('can get 2 users at offset 3', async () => {
  const fiveUsers = await api
    .get('users?limit=5')
    .then(response => response.data.users)
  const twoUsers = await api
    .get('users?limit=2&offset=3')
    .then(response => response.data.users)

  const [firstUser, secondUser] = twoUsers
  const [,,, firstUserAll, secondUserAll] = fiveUsers
  expect(firstUser).toEqual(firstUserAll)
  expect(secondUser).toEqual(secondUserAll)
})
