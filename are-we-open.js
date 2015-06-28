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

newTimehelper( 
                {        
                        weekdayOpen = 1;
                        weekendOpen = 3;
                        weekdayClose = 12;
                        weekendClose = 11;
                }

            ).then( T.compareHourRange() );