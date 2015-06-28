/*
    timeHelper returns 'open' if your business is currently open
*/

/*  Initialize a timeHelper with UTC hours for weekday and weekend hours

    var myTimeHelper = new timeHelper({
        this.weekdayOpen = 1;
        this.weekdayClose = 12;
        this.weekendOpen = 3;
        this.weekendClose = 11;
    });
*/

'use strict';
var q = require('q');


var timeHelper = function( params ){
    // all hours are UTC
    var self = this;

    // extract weekday and weekend hours from params object
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
        self.date = new Date( Date() );
    }();

    // Initialize Day and Hour when called

    self.initHourAndDay = function(){
        var deferred = q.defer();
        deferred.resolve = (
            function(){
                self.generateDay();
                self.generateHour();
            }()
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
        if ( self.isPreviousDay( {
                offset: 8
            })
        ){
            self.day = self.day - 1;
        }
    };

    self.checkWeekend = function(){
        if( self.day === 0 || self.day === 7 ){
            self.isWeekend = true;
        } else {
            return false;
        }
    };

    self.checkEdgeDay = function(){
        // If it's Sat or Mon UTC, but Fri or Sun PST, check to see if the day needs
        // to be localized
        
        if( self.day === 1 || self.day === 7 ){
            self.localizePST();
        }

    };

    self.setHours = function(){
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

                    // If the current UTC hour is after the opening hour and before the closing hour, return 'open'
                    if ( self.hour >= self.open && self.hour < self.close ) {
                        console.log('open');
                        return 'open';
                    
                    // Else, return 'closed'
                    
                    } else {
                        console.log('closed');
                        return 'closed';
                    
                    };

                }
            );                
    };
};

module.exports.timeHelper = timeHelper;




