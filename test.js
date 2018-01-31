const express = require('express');
const request = require('supertest');
const resolvePath = require('./');

describe('express-resolve-path', () => {

  it('should treat multiple slashes as single slashes.', done => {
    const app = express();

    app.use(resolvePath());

    app.get('/foo/bar', (req, res) => res.end(req.url));

    request(app)
      .get('///foo///bar///?val=test')
      .expect('/foo/bar?val=test', done);
  });

  it('should support the allowed methods.', done => {
    const app = express();

    app.use(resolvePath({ methods: 'POST' }));

    app.post('/foo', (req, res) => res.send(req.url));

    request(app)
      .post('/foo//')
      .expect('/foo', done);
  });

  it('should not be case sensitive in the allow method.', done => {
    const app = express();

    app.use(resolvePath({ methods: 'get' }));

    app.get('/not-sensitive', (req, res) => res.send(req.url));

    request(app)
      .get('/not-sensitive//')
      .expect('/not-sensitive', done);
  });

  it('should support an array of allowed methods.', done => {
    const app = express();

    app.use(resolvePath({ methods: ['GET', 'POST'] }));

    app.post('/method', (req, res) => res.send(req.url));

    request(app)
      .post('//method//?type=array')
      .expect('/method?type=array', done);
  });

});
