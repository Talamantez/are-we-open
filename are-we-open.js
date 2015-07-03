'use strict'

var t = require('./timeHelper');
var q = require('q');
var T = null;

var newTimehelper = function( params ){

    var deferred = q.defer();

    deferred.resolve(
        T = new t.timeHelper(                
                {        
                    weekdayOpen : 6,
                    weekdayClose : 18,
                    weekendOpen : 8,
                    weekendClose : 17
                } )
    );
    return deferred.promise;
}

newTimehelper();
T.initHourRange();
console.log( T.isOpen() );