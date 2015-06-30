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

    var params =
        {
            weekdayOpen : 1,
            weekdayClose : 12,
            weekendOpen : 2,
            weekendClose : 11
        };


    test("mockData() should be a number", function(){
            var T = new t.timeHelper( params );
            expect( T ).to.be.an('object'); 
        });

    test("mockData() should have the generateDate function", function(){
            var T = new t.timeHelper( params );
            expect( T ).to.have.property('generateDate');
        });    

});