var expect  = require('chai').expect;
var request = require('request');

describe('movies endpoint', function() {
    describe ('get all movies', function() {
        it('status', function(done){
            request('http://localhost:3001/movies', function(error, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });
        })
    })})