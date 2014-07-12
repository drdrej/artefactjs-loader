var assert = require("assert");
var _ = require("underscore");

describe('Test load json', function () {

    it( "load(json) - absolute path exists", function (done) {

        var lib = require('../lib');
        var path = __dirname + '/./test.json';
        var json = lib.load( path );

        assert.ok(json);
        assert.equal( json.$path, path );
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });


    it( "load(json) - json is in proccess directory.", function (done) {

        var lib = require('../lib');
        var path = './test-in-process.json';
        var json = lib.load( path );

        assert.ok(json);
        assert.equal( json.$path, path );
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });

    it( "load(json) - relative path", function (done) {

        var lib = require('../lib');
        var path = './test.json';
        var json = lib.load( path );

        assert.ok(json);
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });

});