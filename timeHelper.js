/*
    timeHelper returns 'open' if your business is currently open
*/

/*  Initialize a timeHelper with UTC hours for weekday and weekend hours

    var myTimeHelper = new timeHelper({
        weekdayOpen : 1,
        weekdayClose : 12,
        weekendOpen : 3,
        weekendClose : 11
    });
*/

'use strict';
var q = require('q');


var timeHelper = function( params ){
    // all hours are UTC
    var self = this;

    // throw an error if the params are anything other than the expected params

    for( var prop in params ){
        if( prop !== 'weekdayOpen'){
            if( prop !== 'weekdayClose'){
                if( prop !== 'weekendOpen'){
                    if( prop !== 'weekendClose'){
                        throw new Error('You have to use valid properties to initialize this method');                        
                    }
                }
            }
        }
    }

    // extract weekday and weekend hours from params object
    if( !params.weekdayOpen || !params.weekdayClose || !params.weekendOpen || !params.weekendClose){
        throw new Error(' Look like you\'re missing a parameter');
    }

    // throw an error if the params are anything other than numbers
    
    for ( var prop in params ) {
        if( typeof params[ prop ] !== "number" ){

            throw new Error('Hours must be numbers');
        }
    }

    // throw an error if params are not between 1 and 2 digits

    for ( var prop in params ){
        if ( params[ prop ].toString().length > 2 || params[ prop ].toString().length < 1 ){
            throw new Error('Open and close hours must be 1 or 2 digits');
        }
    }

    self.weekdayOpen  = params.weekdayOpen;
    self.weekdayClose = params.weekdayClose;
    self.weekendOpen  = params.weekendOpen;
    self.weekendClose = params.weekendClose;
    
    // initialize date, day, and hour as null
    self.date = null;
    self.day  = null;
    self.hour = null;

    // initialize open and close hours as null
    self.open  = null;
    self.close = null;

    // Generate a new date when the object is created
    self.generateDate = function(){
        //console.log( new Date( Date() ) );
        var deferred = q.defer();
        deferred.resolve = (
            self.date = new Date( Date() )
        );
        return deferred.promise;
    };

    self.generateDay = function(){
        var deferred = q.defer();
        deferred.resolve( 
            self.day = self.date.getUTCDay()
        );
        return deferred.promise;
    };
    
    self.generateHour = function(){
        var deferred = q.defer();
        deferred.resolve = (
            self.hour = self.date.getUTCHours()
        );
        return deferred.promise;
    };
    // Initialize Day and Hour when called

    self.initTime = function(){
        var deferred = q.defer();
        deferred.resolve = (
            function(){
                self.generateDay();
                self.generateHour();
            }()
        );
        return deferred.promise;

    };

    self.printHours = function(){
        console.log('weekdayOpen  : ' + self.weekdayOpen);
        console.log('weekdayClose : ' + self.weekdayClose);
        console.log('weekendOpen  : ' + self.weekendOpen);
        console.log('weekendClose : ' + self.weekendClose);
    };

    // This is a subroutine to handle the edge cases of
    // transition between weekend and weekday.
    // The two edge case days are Sat and Mon.
    // UTC Sat may still be PST Fri.
    // UTC Mon may still be PST Sun.
    // The hour offset for PST is 8 hours

    self.isPreviousDay = function( params ){
        // if the current hour - 8 goes into the negative
        // it means the day UTC is the previous day PST
        // Accepts an object with hour "offset" as a param
        console.log('checking for previous day');

        if( self.hours - params.offset > 0 ){
            return true;
        } else {
            return false;
        }

    };

    self.localizePST = function(){
    // localize to previous day if an 8 hour negative offset returns a negative value 
    // self.isPreviousDay takes the hour offset as a param
    // since PST is 8 hours behind UTC, use 8 as the offset param
    console.log('localizing');
        if ( self.isPreviousDay( {
                offset: 8
            })
        ){
            self.day = self.day - 1;
        }
    };

    self.checkWeekend = function(){
        console.log('checking weekend');
        if( self.day === 0 || self.day === 7 ){
            self.isWeekend = true;
        } else {
            return false;
        }
    };

    self.checkEdgeDay = function(){
        // If it's Sat or Mon UTC, but Fri or Sun PST, check to see if the day needs
        // to be localized
        console.log('checking edge day');
        
        if( self.day === 1 || self.day === 7 ){
            self.localizePST();
        }

    };

    self.setHours = function(){
        console.log('setting hours');
        var deferred = q.defer();
        deferred.resolve(
            function(){
                if( self.checkWeekend() ){
                    // If true, set open and close to weekend hours
                    self.open = self.weekendOpen;
                    self.close = self.weekendClose;
                } else {
                    // Else, set open and close to weekday hours
                    self.open = self.weekdayOpen;
                    self.close = self.weekdayClose;
                }
            });
        return deferred.promise;        
    };


    self.compareHourRange = function(){
        // Initialize the hour and day
        self.initHourAndDay()
            .then( self.checkEdgeDay() )
            .then( self.checkWeekend() )
            .then( self.setHours() )
            .then(
                function(){

                    console.log('comparing Hour range');
                    // If the current UTC hour is after the opening hour and before the closing hour, return 'open'
                    if ( self.hour >= self.open && self.hour < self.close ) {
                        console.log('open');
                        return 'open';
                    
                    // Else, return 'closed'
                    
                    } else {
                        console.log('closed');
                        return 'closed';
                    
                    };

                }()
            );                
    };
};

module.exports.timeHelper = timeHelper;




