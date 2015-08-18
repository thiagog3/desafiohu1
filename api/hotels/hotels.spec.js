'use strict';

var should = require('should');
var app = require('../../server');
var request = require('supertest');

describe('HOTELS TESTS', function() {
  it('should respond with a Hotel type', function(done) {
    request(app)
    .get('/api/hotels/query')
    .query({param: 'Tuntas Apartments Kusadasi'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      res.body.length.should.be.equal(1);
      res.body[0].type.should.equal("hotel");
      done();
    });
  });

  it('should the first respond with a City type', function(done) {
    request(app)
    .get('/api/hotels/query')
    .query({param: 'Barra Mansa'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      res.body[0].type.should.equal("city");
      done();
    });
  });

});