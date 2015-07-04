var assert = require('chai').assert;
var expect = require('chai').expect;
var chai = require('chai');
var t = require('../timeHelper.js');

suite("initialization testing", function(){
    
    test("throw an error if a function is passed as a param", function(){
        var params = {
            weekdayOpen : function(){ 
                console.log('I\'m sorry, but you\'re compromised with wild hackings')
            }(),
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });
    
    test("throw an error if a param is a string", function(){
        var params = {
            weekdayOpen: 'tacos',
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if params are missing", function(){
        var params = {
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if params are not between 1 and 2 digits", function(){
        var params = {
            weekdayOpen : 123,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if unexpected properties are specified", function(){
        var params = {
            Unexpected : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("4 expected params as 1-2 digit nums should not error", function(){
        var params = {
            weekdayOpen : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.not.throw( Error );        
    })
})


suite("time-generation: ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    
    // Generate date tests

    test("generateDate should load a date object into self.date", function(){
        T.generateDate()
        expect( T.date ).to.exist;
    });

    test("generateDate should not fail to load a date object into self.date", function(){
        T.generateDate();
        expect( T.date ).to.not.equal( null );
    });    

    test("generateDate should load an object into self.date who's valueOf() function returns a number", function(){
        T.generateDate();
        var value = T.date.valueOf();
        expect( value ).to.be.a('number');
    });    

    test("generateDate should load an object into self.date who's valueOf() does not return a string", function(){
        T.generateDate();
        var value = T.date.valueOf();
        expect( value ).to.not.be.a('string');
    }); 

    test("generateDate should load an object into self.date who's valueOf() returns a 13 digit number", function(){
        T.generateDate();
        var value = T.date.valueOf().toString();
        expect( value ).to.have.length( 13 );
    }); 

    test("generateDate should load an object into self.date who's valueOf() does not return a string", function(){
        T.generateDate();
        var value = T.date.valueOf();
        expect( value ).to.not.be.a('string');
    }); 


    // Generate Day tests

    test("generateDay() should return a number", function(){
        T.generateDate();
        T.generateDay();
        var value = T.day;
        expect( value ).to.be.a( 'number' );
    });

    test("generateDay() should return a number of length 1", function(){
        T.generateDate();
        T.generateDay();
        var value = T.day.toString();
        expect( value ).to.have.length( 1 );
    });

    test("generateDay() should return a number ranging between 1 and 7", function(){
        T.generateDate();
        T.generateDay();
        var value = T.day;
        expect( value ).to.be.at.least(1).and.to.be.below(8);
    });

    test("generateDay() should return a number ranging between 1 and 7", function(){
        T.generateDate();
        T.generateDay();
        var value = T.day;
        expect( value ).to.be.at.least( 1 ).and.to.be.below( 8 );
        });

    // Generate Hour tests

    test("generateHour() should return a number", function(){
        T.generateDate();
        T.generateHour();
        var value = T.hour;
        expect( value ).to.be.a( 'number' );
    });

    test("generateHour() should return a number of length 1 or 2", function(){
        T.generateDate();
        T.generateHour();
        var value = T.hour.toString();
        expect( value.length ).to.be.at.least( 1 ).and.to.be.below( 3 );
    });

    test("generateHour() should return a number ranging between 0 and 23", function(){
        T.generateDate();
        T.generateHour();
        var value = T.hour;
        expect( value ).to.be.at.least( 0 ).and.to.be.below( 24 );
    });

});

suite("Localize : ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    

    // localization

    // self.localize localizes to PDT if self.daylightTime() returns true
    // else, it localizes to PST

    // self.daylightTime should return true if the date is between 
    // the second sunday in March to the first sunday in November

    test("If self.month = 3-9 ( April - Oct ), daylightTime should return true", function(){
        for( var i = 3 ; i < 10 ; i++ ){
            T.month = i;
            var result = T.daylightTime();
            console.log('result ' + result );
            expect( result ).to.equal( true );
        }
    });

    test("If self.month = 0 || 1 ( Jan - Feb ), daylightTime should return false", function(){
        for( var i = 0 ; i < 2 ; i++ ){
            T.month = i;
            var result = T.daylightTime();
            console.log('result ' + result);
            expect( result ).to.equal( false );
        }
    });


    // Test transition from PST to PDT
    // if it's march...

    test("If self.month = 2 && self.UTCDate < 7, daylightTime should return false", function(){
        T.month = 2;
        for( var i = 1 ; i < 7 ; i++ ){
            T.UTCDate = i;
            var result = T.daylightTime();
            expect( result ).to.equal( false );
        }
    });

    test("If self.month = 2 && self.UTCDate > 14, daylightTime should return true", function(){
        T.month = 2;
        T.UTCDate = 15;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 2 && self.UTCDate is between 7 & 15, & self.day === 0, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 8;
        T.day = 0;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 2 && self.UTCDate is after the 8th & self.day === 1, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 9;
        T.day = 1;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 8th & self.day === 1, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 8;
        T.day = 1;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 2 && self.UTCDate is after the 9th & self.day === 2, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 10;
        T.day = 2;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 9th & self.day === 2, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 9;
        T.day = 2;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 2 && self.UTCDate is after the 10th & self.day === 3, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 11;
        T.day = 3;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 10th & self.day === 3, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 10;
        T.day = 3;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 2 && self.UTCDate is after the 11th & self.day === 4, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 12;
        T.day = 4;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 11th & self.day === 4, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 11;
        T.day = 4;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 2 && self.UTCDate is after the 12th & self.day === 5, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 13;
        T.day = 5;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 12th & self.day === 5, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 12;
        T.day = 5;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 2 && self.UTCDate is after the 13th & self.day === 6, daylightTime should return true ", function(){
        T.month = 2;
        T.UTCDate = 14;
        T.day = 6;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });
    
    test("If self.month = 2 && self.UTCDate is the 13th & self.day === 6, daylightTime should return false ", function(){
        T.month = 2;
        T.UTCDate = 13;
        T.day = 6;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });
    
    // Test transition from PDT to PST
    // if it's November...
    
    test("If self.month = 10 && self.UTCDate > 7, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 8;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    test("If self.month = 10 && self.UTCDate < 8 & self.day === 0, daylightTime should return false ", function(){
        T.month = 10;
        T.UTCDate = 7;
        T.day = 0;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's monday...
    test("If self.month = 10 && self.day = 1 && self.UTCDate is not after the 1st, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 1;
        T.day = 1;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 1 && self.UTCDate is after the 1st, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 2;
        T.day = 1;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's tuesday...
    test("If self.month = 10 && self.day = 2 && self.UTCDate is not after the 2nd, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 2;
        T.day = 2;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 2 && self.UTCDate is after the 2nd, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 3;
        T.day = 2;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's wednesday...
    test("If self.month = 10 && self.day = 3 && self.UTCDate is not after the 3rd, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 3;
        T.day = 3;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 3 && self.UTCDate is after the 3rd, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 4;
        T.day = 3;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's thursday...
    test("If self.month = 10 && self.day = 4 && self.UTCDate is not after the 4th, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 4;
        T.day = 4;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 4 && self.UTCDate is after the 4th, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 5;
        T.day = 4;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's friday...
    test("If self.month = 10 && self.day = 5 && self.UTCDate is not after the 5th, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 5;
        T.day = 5;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 5 && self.UTCDate is after the 5th, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 6;
        T.day = 5;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

    // if it's saturday...
    test("If self.month = 10 && self.day = 6 && self.UTCDate is not after the 6th, daylightTime should return true", function(){
        T.month = 10;
        T.UTCDate = 6;
        T.day = 6;
        var result = T.daylightTime();
        expect( result ).to.equal( true );
    });

    test("If self.month = 10 && self.day = 6 && self.UTCDate is after the 6th, daylightTime should return false", function(){
        T.month = 10;
        T.UTCDate = 7;
        T.day = 6;
        var result = T.daylightTime();
        expect( result ).to.equal( false );
    });

});

suite("time-generation: ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    
    // Check for weekends

    test("checkWeekend should return true if T.day is 0", function(){
        expect( 0 ).to.satisfy( function(day){
            var result = T.checkWeekend( day );
            return result;
        });
    });   

    test("checkWeekend should return true if T.day is 7", function(){
        expect( 7 ).to.satisfy( function(day){
            var result = T.checkWeekend( day );
            return result;
        });
    });        

    test("checkWeekend should return false if T.day is 1-6", function(){
        for( var i = 1 ; i < 7 ; i++ ){
            expect( i ).to.not.satisfy( 
                function(day){
                    var result = T.checkWeekend( day );
                    return result;
                }
            );
        };
    });

    // initTime runs generate Date, UTCDate, Month, Day, Hour.  Check to make sure these
    // values load into the object

    test("initTime should set self.date", function(){
        T.initTime();
        expect( T.date ).to.not.equal( null );
    });

    test("initTime should set self.day", function(){
        T.initTime();
        expect( T.day ).to.not.equal( null );
    });

    test("initTime should set self.hour", function(){
        T.initTime();
        expect( T.hour ).to.not.equal( null );
    });

    test("setHourRange should set self.open", function(){
        T.setHourRange();
        expect( T.open ).to.not.equal( null );
    });

    test("setHourRange should set self.close", function(){
        T.setHourRange();
        expect( T.open ).to.not.equal( null );
    });

    test("setHourRange should set self.open to self.weekendOpen if day is 7", function(){
        T.day = 7;
        T.setHourRange();
        expect( T.open ).to.equal( T.weekendOpen );
    });

    test("setHourRange should set self.open to self.weekendOpen if day is 0", function(){
        T.day = 0;
        T.setHourRange();
        expect( T.open ).to.equal( T.weekendOpen );
    });

    test("setHourRange should set self.close to self.weekendClose if day is 7", function(){
        T.day = 7;
        T.setHourRange();
        expect( T.close ).to.equal( T.weekendClose );
    });

    test("setHourRange should set self.close to self.weekendClose if day is 0", function(){
        T.day = 0;
        T.setHourRange();
        expect( T.close ).to.equal( T.weekendClose );
    });

    test("setHourRange should set self.open to self.weekdayOpen if day is 1-6", function(){
        for( var i = 1 ; i < 7 ; i++ ){
            T.day = i;
            T.setHourRange();
            expect( T.open ).to.equal( T.weekdayOpen )
        }
    });

    test("setHourRange should set self.close to self.weekdayClose if day is 1-6", function(){
        for( var i = 1 ; i < 7 ; i++ ){
            T.day = 0;
            T.setHourRange();
            expect( T.close ).to.equal( T.weekendClose )
        }
    });

});

suite("Hour range comparison", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 6,
            weekdayClose : 18,
            weekendOpen : 8,
            weekendClose : 17
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    

    test("If self.hour < self.open, expect isOpen() to return false ", function(){
        T.hour = 2;
        T.open = 7;
        expect( T.isOpen() ).to.equal( false );
    });

    test("If self.hour >= self.close, expect isOpen() to return false ", function(){
        T.hour = 23;
        T.close = 7;
        expect( T.isOpen() ).to.equal( false );
    });

    test("If self.hour >= self.open && < self.close, expect isOpen() to return true", function(){
        T.hour = 12;
        T.open = 11;
        T.close = 13;
        expect( T.isOpen() ).to.equal( true );
    });

    test("initHourRange should set self.date", function(){
        T.initHourRange();
        expect( T.date ).to.not.equal( null );
    });
    test("initHourRange should set self.day", function(){
        T.initHourRange();
        expect( T.day ).to.not.equal( null );
    });
    test("initHourRange should set self.hour", function(){
        T.initHourRange();
        expect( T.hour ).to.not.equal( null );
    });
    test("initHourRange should change the day if localization is necessary", function(){
    });
    test("initHourRange should set self.open", function(){
        T.initHourRange();
        expect( T.open ).to.not.equal( null );
    });
    test("initHourRange should set self.close", function(){
        T.initHourRange();
        expect( T.close ).to.not.equal( null );        
    });

});








