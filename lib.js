
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

    return {
        "$path" : path,
        "$modified" :stats.mtime,
        "$json" : json
    }
};