const app = require('../server/server')
const supertest = require('supertest')
const request = supertest(app)

test('Get / endpoint', async done => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    done()
})

test('Get /test endpoint', async done => {
    const response = await request.get('/test')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('WORKS')
    done()
})