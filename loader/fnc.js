var fs = require('fs');
require( 'colors' );

/**
 * loads function. to load this impl. use require().
 *
 * if function loaded, returns json wrapped by meta-info about file.
 *
 * @param fnc is function or path to js-file.
 *
 * @return {{$path: *, $modified: *, $json: *}}
 */
exports.load = function( fnc, strategy ) {
    var _ = require( 'underscore' );

    if( !strategy ) {
        strategy = function() {
            console.log("[ERROR] passed param:strategy is undefined. should be a function.");
        };
    }

    if(_.isFunction(fnc) ) {
        console.log( "-- passed value is a function. try to exec." );
        return fnc;
    } else if( _.isString(fnc) ) {
        console.log( "-- passed value is path: %j", fnc);

        var isFilePath = require( '../asserts/isFilePath').check;

        var foundPath = isFilePath(fnc);
        if( foundPath ) {
            var pathUtil = require( 'path' );
            var resolved = pathUtil.resolve(pathUtil.normalize( foundPath ));

            var loaded = require(resolved);
            var rval = strategy(loaded);

            return rval;
        } else {
            if( fs.existsSync(fnc) ) {
                return strategy( fnc );
            }
        }

        return strategy(fnc);
    } else {
        console.log( ("[ERROR] couldn't use function: " + fnc).red );
        throw "ERROR: don't accept param:transformFnc";
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

    var stats = fs.statSync(path);

    return {
        "$path" : path,
        "$modified" :stats.mtime,
        "$json" : json
    };
};