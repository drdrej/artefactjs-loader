
var colors = require( 'colors' );

exports.load = function( path ) {
    var S = require( 'string' );
    var str = S(path);

    if( !str.endsWith( '.json' ) ) {
        console.log( "[ERROR] couldn't load config. path should ends with '.json'.".red);
        console.log( "-- passed path:  " + path );

        return;
    }

    var json = null;
    try {
        json = require(path);
    } catch(err){
        console.log( "[ERROR] couldn't load config. check exception...".red );
        console.log( err );

        return;
    }

    if( !json ) {
        console.log( "[ERROR] couldn't load config. something is wrong...".red );

        return;
    }

    console.log( ("[INFO] json loaded. path = " + path).green);

    var fs = require('fs');
    var stats = fs.statSync(path);

    /*
    { dev: 2049
        , ino: 305352
        , mode: 16877
        , nlink: 12
        , uid: 1000
        , gid: 1000
        , rdev: 0
        , size: 4096
        , blksize: 4096
        , blocks: 8
        , atime: '2009-06-29T11:11:55Z'
        , mtime: '2009-06-29T11:11:40Z'
        , ctime: '2009-06-29T11:11:40Z'
    } */

    return {
        "$path" : path,
        "$modified" :stats.mtime,
        "$json" : json
    }
};