'use strict'

var t = require('./timeHelper');
var q = require('q');
var T = null;

var newTimehelper = function( params ){

    var deferred = q.defer();

    deferred.resolve(
        T = new t.timeHelper(                
                {        
                        weekdayOpen : 1,
                        weekendOpen : 3,
                        weekdayClose : 12,
                        weekendClose : 11
                } )
    );
    return deferred.promise;
}

newTimehelper()
    .then(  T.generateDate() )
    .then(
        function( data ){
            console.log( data );
        }
    )

    ;
