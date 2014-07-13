var fs = require('fs');
var colors = require( 'colors' );


var loadJSON = function( path ) {
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

    var stats = fs.statSync(path);

    return {
        "$path" : path,
        "$modified" :stats.mtime,
        "$json" : json
    };
};


var loadInProcess = function( path ) {
    var Path = require( 'path' );

    console.log( "-- in caller-path not exists, try in process..." );
    var inProcess = Path.resolve( process.cwd(), path);

    if( fs.existsSync(inProcess) ) {
        return loadJSON( inProcess );
    }
};

var loadInCaller = function(path) {
    var callsite = require('callsite');

    var stack = callsite();
    var callerFile = stack[2].getFileName();

    var Path = require( 'path' );
    var callerDir = Path.dirname( callerFile );
    var resolved = Path.resolve(callerDir, path);

    console.log( "-- use caller-file to resolve json-path." );
    console.log( " try: " + resolved );

    if( fs.existsSync(resolved) ) {
        return loadJSON(resolved);
    }
};


exports.load = function( path ) {
    var S = require( 'string' );
    var str = S(path);

    if( !str.endsWith( '.json' ) ) {
        console.log( "[ERROR] couldn't load config. path should ends with '.json'.".red);
        console.log( "-- passed path:  " + path );

        return;
    }


    if( !fs.existsSync(path) ) {
        console.log( "-- path not exists. path : " + path );
        console.log( "-- try to resolve... " );

        var loaded = loadInProcess(path);
        if( loaded )
            return loaded;

        loaded = loadInCaller(path);
        if( loaded )
            return loaded;

        console.log( "[ERROR] couldn't resolve file: " + path);
        return;
    } else {
        console.log( "-- file exists: " + path);
        return loadInProcess(path);
    }

    return loadJSON( path );
};