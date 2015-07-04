/*
    timeHelper returns 'open' if your business is currently open
*/

/*  Initialize a timeHelper with UTC hours for weekday and weekend hours

    var myTimeHelper = new timeHelper({
        weekdayOpen : 6,
        weekdayClose : 18,
        weekendOpen : 8,
        weekendClose : 17
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
        throw new Error(' Looks like you\'re missing a parameter');
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
    self.UTCDate = null;
    self.day  = null;
    self.hour = null;
    self.month = null;

    // initialize open and close hours as null
    self.open  = null;
    self.close = null;

    self.generateDate = function(){
        self.date = new Date( Date() );
    };

    self.generateUTCDate = function(){
        self.UTCDate = self.date.getUTCDate();
    };    

    self.generateMonth = function(){
        self.month = self.date.getUTCMonth()      
    }

    self.generateDay = function(){
        self.day = self.date.getUTCDay()
    };
    
    self.generateHour = function(){  
        self.hour = self.date.getUTCHours()
    };

    // Initialize Day and Hour when called

    self.initTime = function(){
        self.generateDate();
        self.generateUTCDate();
        self.generateDay();
        self.generateHour();
        self.generateMonth();
    };

    self.printHours = function(){
        console.log('weekdayOpen  : ' + self.weekdayOpen);
        console.log('weekdayClose : ' + self.weekdayClose);
        console.log('weekendOpen  : ' + self.weekendOpen);
        console.log('weekendClose : ' + self.weekendClose);
    };

    self.daylightTime = function(){
        // if it's April through October, use daylight time ( PDT )
        // if it's December through Feb, use standard time ( PST )
        // if it's March and on or after the 2nd sunday of the month
        //      use PDT
        // if it's November and on or after the 1st sunday of the month
        //      use PST

        if( self.month > 2 && self.month < 10 ){
            return true;

        } else if( self.month === 12 || self.month === 0 || self.month === 1 ){
            return false;

        // If it's March ...
        } else if( self.month === 2 ){
            // if it's before the March 8, use PST
            if( self.UTCDate < 8 ){
                return false;

            // if it's after March 14th, use PDT   
            } else if( self.UTCDate > 14 ) {
                return true;
            
            // if it's Sunday, it's the second one, so return true
            } else if( self.day === 0 ){
                return true;
            
            // if it's Monday, check to see if it's after the 8th, 
            // if so, the second Sunday must have passed already, use PDT
            } else if( self.day === 1 ){
                if( self.UTCDate > 8 ){
                    return true;
                } else {
                    return false;
                } 
     
            // if it's Tuesday, check to see if it's after the 9th, 
            // if so, the second Sunday must have passed already, use PDT            
            } else if( self.day === 2 ){
                if( self.UTCDate > 9 ){
                    return true;
                } else {
                    return false;
                } 
 
            // if it's Wednesday, check to see if it's after the 10th, 
            // if so, the second Sunday must have passed already, use PDT            
            } else if( self.day === 3 ){
                if( self.UTCDate > 10 ){
                    return true;
                } else {
                    return false;
                }
            // if it's Thursday, check to see if it's after the 11th, 
            // if so, the second Sunday must have passed already, use PDT                         
            } else if( self.day === 4 ){
                if( self.UTCDate > 11 ){
                    return true;
                } else {
                    return false;
                }
            // if it's Friday, check to see if it's after the 12th, 
            // if so, the second Sunday must have passed already, use PDT 
            } else if( self.day === 5 ){
                if( self.UTCDate > 12 ){
                    return true;
                } else {
                    return false;
                }
            // if it's Saturday, check to see if it's after the 13th, 
            // if so, the second Sunday must have passed already, use PDT
            } else if( self.day === 6 ){
                if( self.UTCDate > 13 ){
                    return true;
                } else {
                    return false;
                }
            }   
        // If it's November...
        } else if( self.month === 10 ){
            // if it's after November 7, use PST
            if( self.UTCDate > 7 ) {
                return false;
            
            // if it's Sunday, it's the first one, so return false
            } else if( self.day === 0 ){
                return false;
            
            // if it's Monday, check to see if it's after the 1st, 
            // if so, the first Sunday must have passed already, use PST
            } else if( self.day === 1 ){
                if( self.UTCDate > 1 ){
                    return false;
                } else {
                    return true;
                } 
     
            // if it's Tuesday, check to see if it's after the 2nd, 
            // if so, the first Sunday must have passed already, use PST            
            } else if( self.day === 2 ){
                if( self.UTCDate > 2 ){
                    return false;
                } else {
                    return true;
                } 
 
            // if it's Wednesday, check to see if it's after the 3rd, 
            // if so, the first Sunday must have passed already, use PST            
            } else if( self.day === 3 ){
                if( self.UTCDate > 3 ){
                    return false;
                } else {
                    return true;
                }
            // if it's Thursday, check to see if it's after the 4th, 
            // if so, the first Sunday must have passed already, use PST                         
            } else if( self.day === 4 ){
                if( self.UTCDate > 4 ){
                    return false;
                } else {
                    return true;
                }
            // if it's Friday, check to see if it's after the 5th, 
            // if so, the first Sunday must have passed already, use PST 
            } else if( self.day === 5 ){
                if( self.UTCDate > 5 ){
                    return false;
                } else {
                    return true;
                }
            // if it's Saturday, check to see if it's after the 6th, 
            // if so, the first Sunday must have passed already, use PST
            } else if( self.day === 6 ){
                if( self.UTCDate > 6 ){
                    return false;
                } else {
                    return true;
                }
            }
        }            
    }

    self.localize = function(){
        var isDaylightTime = self.daylightTime();
        if( isDaylightTime ){
            self.localizePDT();
        } else {
            self.localizePST();
        }
    }

    self.localizePDT = function(){
        // localize timezone UTC-7
        // adjust the day if necessary
        // if self.hour === 7-23,
        //      self.hour = self.hour - 7
        // if self.hour === 0-6
        //      self.hour = self.hour + 17
        //      if self.day === 0
        //          self.day = 7
        //      else
        //          self.day = self.day -1
        console.log(' localizing PDT ');

        if( self.hour > 6 ){
            console.log('self.hour init: ' + self.hour);
            self.hour = self.hour - 7;
            console.log('self.hour adj: ' + self.hour);
        } else {
            self.hour = self.hour + 17;
            if(self.day === 0){
                self.day = 7;
            } else {
                self.day = self.day - 1;
            }
        }
    }

    self.localizePST = function(){
        // localize timezone to UTC-8
        // adjust the day if necessary
        // if self.hour === 8-23,
        //      self.hour = self.hour - 8
        // if self.hour === 0-6
        //      self.hour = self.hour + 16
        //      if self.day === 0
        //          self.day = 7
        //      else
        //          self.day = self.day -1        
        console.log(' localizing PST ');

        if( self.hour > 7 ){
            self.hour = self.hour - 8;
        } else {
            self.hour = self.hour + 16;

            if(self.day === 0){
                self.day = 7;
            } else {
                self.day = self.day - 1;
            }
        }    
    }

    self.checkWeekend = function( day ){
        // Check to see if it's saturday or sunday
        if( day === 0 || day === 7 ){
            return true;
        } else {
            return false;
        }
    };

    self.setHourRange = function(){
        var deferred = q.defer();
        deferred.resolve(
            function(){
                if( self.checkWeekend( self.day ) ){
                    // If true, set open and close to weekend hours
                    self.open = self.weekendOpen;
                    self.close = self.weekendClose;
                } else {
                    // Else, set open and close to weekday hours
                    self.open = self.weekdayOpen;
                    self.close = self.weekdayClose;
                }
            }()
        );
        return deferred.promise;        
    };

    self.initHourRange = function(){
        self.initTime();
        self.localize();
        self.setHourRange();
    };

    self.isOpen = function(){
        console.log(    'self.hour: ' + self.hour + '\n' + 
                        'self.open: ' + self.open + '\n' +
                        'self.close: ' + self.close + '\n'
                        )
        if( self.hour < self.open || self.hour >= self.close ){
            return false;
        }
        else {
            return true;
        }
    };

};

module.exports.timeHelper = timeHelper;