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
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });
    
    test("throw an error if a param is a string", function(){
        var params = {
            weekdayOpen: 'tacos',
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if params are missing", function(){
        var params = {
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if params are not between 1 and 2 digits", function(){
        var params = {
            weekdayOpen : 123,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("throw an error if unexpected properties are specified", function(){
        var params = {
            Unexpected : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.throw( Error );
    });

    test("4 expected params as 1-2 digit nums should not error", function(){
        var params = {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11            
        };
        var fn = function(){
            var T = new t.timeHelper( params )
        };
        expect( fn ).to.not.throw( Error );        
    })
})

suite("test the object", function(){
    /*
     *  timeHelpers accepts the following params to initialize it:
     *     
        {
            weekdayOpen : INT(0-24),
            weekdayClose : INT(0-24,
            weekendOpen : INT(0-24),
            weekendClose : INT(0-24)
        }
     */
    var T = null;
    var params =
        {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );

    
    // Object init tests

    test("instantiating a timeHelper should return an object", function(){
            expect( T ).to.be.an('object');
        });

    test("a timeHelper object should have the generateDate function", function(){
            expect( T ).to.have.property('generateDate');
        });

    test("a timeHelper object should have the initTime function", function(){
            expect( T ).to.have.property('initTime');
        });

    test("a timeHelper object should have the generateDay function", function(){
            expect( T ).to.have.property('generateDay');
        });

    test("a timeHelper object should have the generateHour function", function(){
            expect( T ).to.have.property('generateHour');
        });
    
    test("a timeHelper object should have the printHours function", function(){
            expect( T ).to.have.property('printHours');
        });

    test("a timeHelper object should have the isPreviousDay function", function(){
            expect( T ).to.have.property('isPreviousDay');
        });
    
    test("a timeHelper object should have the localizePST function", function(){
            expect( T ).to.have.property('localizePST');
        });
    
    test("a timeHelper object should have the checkWeekend function", function(){
            expect( T ).to.have.property('checkWeekend');
        });
    
    test("a timeHelper object should have the checkEdgeDay function", function(){
            expect( T ).to.have.property('checkEdgeDay');
        });
    
    test("a timeHelper object should have the setHourRange function", function(){
            expect( T ).to.have.property('setHourRange');
        });
    
    test("a timeHelper object should have the isOpen function", function(){
            expect( T ).to.have.property('isOpen');
        });
    
    test("a timeHelper object should not have the octopus property", function(){
            expect( T ).to.not.have.property('octopus');
        });
});

suite("time-generation: ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    
    // Generate date tests

    test("generateDate should load a date object into self.date", function(){
        T.generateDate().then( 
            function(){
                expect( T.date ).to.exist;
            }()
        )
    });

    test("generateDate should not fail to load a date object into self.date", function(){
        T.generateDate().then( 
            function(){
                expect( T.date ).to.not.equal(null);
            }()
        )
    });    

    test("generateDate should load an object into self.date who's valueOf() function returns a number", function(){
        T.generateDate().then( 
            function(){
                var value = T.date.valueOf();
                expect( value ).to.be.a('number');
            }()
        )
    });    

    test("generateDate should load an object into self.date who's valueOf() does not return a string", function(){
        T.generateDate().then( 
            function(){
                var value = T.date.valueOf();
                expect( value ).to.not.be.a('string');
            }()
        )
    }); 

    test("generateDate should load an object into self.date who's valueOf() returns a 13 digit number", function(){
        T.generateDate().then( 
            function(){
                var value = T.date.valueOf().toString();
                expect( value ).to.have.length( 13 );
            }()
        )
    }); 

    test("generateDate should load an object into self.date who's valueOf() does not return a string", function(){
        T.generateDate().then( 
            function(){
                var value = T.date.valueOf();
                expect( value ).to.not.be.a('string');
            }()
        )
    }); 


    // Generate Day tests

    test("generateDay() should return a number", function(){
        T.generateDate()
            .then( T.generateDay() )
            .then(
                function(){
                    var value = T.day;
                    expect( value ).to.be.a( 'number' );
                }()
        )
    });

    test("generateDay() should return a number of length 1", function(){
        T.generateDate()
            .then( T.generateDay() )
            .then(
                function(){
                    var value = T.day.toString();
                    expect( value ).to.have.length( 1 );
                }()
        )
    });

    test("generateDay() should return a number ranging between 1 and 7", function(){
        T.generateDate()
            .then( T.generateDay() )
            .then(
                function(){
                    var value = T.day;
                    expect( value ).to.be.at.least(1).and.to.be.below(8);
                }()
        )
    });

    test("generateDay() should return a number ranging between 1 and 7", function(){
        T.generateDate()
            .then( T.generateDay() )
            .then(
                function(){
                    var value = T.day;
                    expect( value ).to.be.at.least( 1 ).and.to.be.below( 8 );
                }()
        )
    });

    // Generate Hour tests

    test("generateHour() should return a number", function(){
        T.generateDate()
            .then( T.generateHour() )
            .then(
                function(){
                    var value = T.hour;
                    expect( value ).to.be.a( 'number' );
                }()
        )
    });

    test("generateHour() should return a number of length 1 or 2", function(){
        T.generateDate()
            .then( T.generateHour() )
            .then(
                function(){
                    var value = T.hour.toString();
                    expect( value.length ).to.be.at.least( 1 ).and.to.be.below( 3 );
                }()
        )
    });

    test("generateHour() should return a number ranging between 0 and 23", function(){
        T.generateDate()
            .then( T.generateHour() )
            .then(
                function(){
                    var value = T.hour;
                    expect( value ).to.be.at.least( 0 ).and.to.be.below( 24 );
                }()
        )
    });

});

suite("Localize to PST : ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    

    // localization to PST

    test("isPreviousDay should return true if T.hour - offset < 0", function(){
        T.hour = 0 ;
        expect( { offset: 8 } ).to.satisfy( 
            function( offset ){
                var result = T.isPreviousDay( offset );
                return result;
        });
    });

    test("isPreviousDay should return false if T.hour - offset > 0", function(){
        T.hour = 10 ;
        expect( { offset: 8 } ).to.not.satisfy( 
            function( offset ){
                var result = T.isPreviousDay( offset );
                return result;
        });
    });

    test("localizePST() should set T.day to T.day - 1 if T.hour - 8 < 0 for T.day === 1-7", function(){
        for( var i = 1 ; i < 8 ; i++ ){    
            T.hour = 0;
            T.day = i;
            var storedDay = T.day;
            T.localizePST();
            expect( T.day ).to.equal( i - 1 );
        }
    });    

    test("localizePST() should set T.day to 7 if T.hour - 8 < 0 and T.day === 0", function(){  
            T.hour = 0;
            T.day = 0;
            var storedDay = T.day;
            T.localizePST();
            expect( T.day ).to.equal( 7 );
    });    

    test("localizePST() should not set T.day to T.day - 1 if T.hour - 8 > 0 for T.day === 1-7", function(){
        for( var i = 1 ; i < 8 ; i++ ){    
            T.hour = 10;
            T.day = i;
            var storedDay = T.day;
            T.localizePST();
            expect( T.day ).not.to.equal( i - 1 );
        }
    });


});

suite("time-generation: ", function(){
    var T = null;
    var params =
        {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };

    beforeEach( function(){
        T = null;
        T = new t.timeHelper( params );    
    } );    
    // Check edge days and weekends

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

    test("checkEdgeDay should return true if T.day === 1", function(){
        expect( 1 ).to.satisfy(
            function( day ){
                var result = T.checkEdgeDay( day );
                return result;
            }
        );
    });

    test("checkEdgeDay should return true if T.day === 7", function(){
        expect( 7 ).to.satisfy(
            function( day ){
                var result = T.checkEdgeDay( day );
                return result;
            }
        );
    });    

    test("checkEdgeDay should return false if T.day === 0 || 2-6", function(){
        expect( 0 ).to.not.satisfy(
            function( day ){
                var result = T.checkEdgeDay( day );
            }
        );
        for( var i = 2 ; i < 7 ; i++ ){
            expect( i ).to.not.satisfy( 
                function(day){
                    var result = T.checkWeekend( day );
                    return result;
                }
            );
        };
    });

    test("initTime should set self.date", function(){
        T.initTime()
            .then(
                function(){
                    expect( T.date ).to.not.equal( null )
                }()
            );
    });

    test("initTime should set self.day", function(){
        T.initTime()
            .then(
                function(){
                    expect( T.day ).to.not.equal( null )
                }()
            );
    });

    test("initTime should set self.hour", function(){
        T.initTime()
            .then(
                function(){
                    expect( T.hour ).to.not.equal( null )
                }()
            );
    });

    test("setHourRange should set self.open", function(){
        T.setHourRange().
            then(
                function(){
                    expect( T.open ).to.not.equal( null )
                }()
            );
    });

    test("setHourRange should set self.close", function(){
        T.setHourRange().
            then(
                function(){
                    expect( T.open ).to.not.equal( null )
                }()
            );
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
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
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
    })

});








