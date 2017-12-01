import axios from 'axios'
import faker from 'faker'
import {generateArticleForClient} from '../../../other/generate/article'
import generateUserData from '../../../other/generate/user'
// you're going to need to start the server before all the tests
// start and close the server after all the tests are finished.
// startServer is a function that returns a promise which resolves
// to the server object. The server object has a `close` function
// which accepts a callback. Kinda wonky, I know... But you should
// learn how to use both async styles with these tests so I left it
// like that :)
import startServer from '../../src/start-server'

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(done => {
  server.close(done)
})

// I'm going to give you this just so you don't have to look it up:
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})
// Note also that the articles endpoints are at: api/articles
// So to get articles, you can do: api.get('articles') which
// will return a promise that resolves to the response from the
// request.
//
// From here you're pretty much on your own.
// To come up with what to test, try to think of
// the use cases you want to support. Start with
// the unauthenticated stuff.
//
// If you want to do authenticated endpoints,
// you'll need to call createNewUser, and use the
// token you get back like this:
// api.defaults.headers.common.authorization = `Token ${token}`
// then the api is authenticated

// just a handy utility for some of our promise-based code
// you might consider making something similar for the articles
// stuff
const getUser = res => res.data.user

//////////////////////
// 👋 Put your tests here
///////////////////////

function checkArticle(article) {
  expect(article).toMatchObject({
    slug: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
    body: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    tagList: expect.any(Array),
    favorited: expect.any(Boolean),
    favoritesCount: expect.any(Number),
    author: {
      username: expect.any(String),
      bio: expect.any(String),
      image: expect.any(String),
      following: expect.any(Boolean),
    },
  })
}
function checkArticleComment(articleComment) {
  expect(articleComment).toMatchObject({
    id: expect.any(String),
    body: expect.any(String),
    createdAt: expect.any(String),
    author:
    {
      username: expect.any(String),
      bio: expect.any(String),
      image: expect.any(String),
      following: expect.any(Boolean),
    },
  })
}

describe('unauthenticated', () => {
  test('can get articles', async () => {
    const articles = await api
    .get('articles')
    .then(response => response.data.articles)
    const article = articles[0]
    checkArticle(article)
  })

  test('can get articles with a limit', async () => {
    const limit = 4
    const articles = await api
    .get(`articles?limit=${limit}`)
    .then(response => response.data.articles)
    expect(articles).toHaveLength(limit)
  })

  test('can get an article', async () => {
    const slug = 'connecting-the-online-feed-like-it\'s-thx'
    const article = await api
    .get(`articles/${slug}`)
    .then(response => response.data.article)
    checkArticle(article)
  })

  test('can get an article\'s comments', async () => {
    const slug = 'connecting-the-online-feed-like-it\'s-thx'
    const comments = await api.get(`articles/${slug}/comments`)
    .then(response => response.data.comments)
    const comment = comments[0]
    checkArticleComment(comment)
  })
})

describe('authenticated', () => {
  let cleanupUser

  beforeAll(async () => {
    const newUserPayload = await createNewUser(generateUserData())
    const token = newUserPayload.user.token
    api.defaults.headers.common.authorization = `Token ${token}`
    cleanupUser = newUserPayload.cleanup
  })
  
  afterAll(async () => {
    await cleanupUser()
    api.defaults.headers.common.authorization = ''
  })

  test.skip('can create an article', async () => {
    const response = await api.post('articles', generateArticleForClient())
  })
})


// I've left this here for you as a little utility that's a little
// domain-specific and isn't super pertinent to learning testing :)
// Just know that utilities like this are pretty darn useful and you
// should probably have things like this in your tests :)
async function createNewUser(overrides) {
  const password = faker.internet.password()
  const userData = generateUserData(overrides)
  const {email, username} = userData
  const user = await api
    .post('users', {user: {email, password, username}})
    .then(getUser)
  return {
    user,
    cleanup() {
      return api.delete(`users/${user.username}`)
    },
  }
}


//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=Testing&e=API%20Integration&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them as extra credit!
// Learn more here: http://kcd.im/testing-workshop-contributing
