var assert = require('chai').assert;
var expect = require('chai').expect;
var chai = require('chai');
var t = require('../timeHelper.js');

suite("Initialize new timeHelper object", function(){
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
    
    test("a timeHelper object should have the setHours function", function(){
            expect( T ).to.have.property('setHours');
        });
    
    test("a timeHelper object should have the compareHourRange function", function(){
            expect( T ).to.have.property('compareHourRange');
        });
    
    test("a timeHelper object should not have the octopus property", function(){
            expect( T ).to.not.have.property('octopus');
        });

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
                expect( T.date ).to.not.equal('null');
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