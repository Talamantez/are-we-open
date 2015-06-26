'use strict'

var t = require('./timeHelper');
var q = require('q');
var T = null;

var newTimehelper = function( open, close ){

    var deferred = q.defer();

    deferred.resolve(
        T = new t.timeHelper( open, close )
    );
    return deferred.promise;
}


newTimehelper( 1 , 12 ).then( T.compareUTCHourRange() );