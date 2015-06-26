
/* 
 *   timeHelper() accepts a start hour and closing hour in UTC.
 *   Its compareUTCHourRange() function checks to see if the 
 *   current UTC time falls between the open and close times.
 *   If so, it toggles .open class to shown, if not, it
 *   toggles .closed class to shown.
*/  

'use strict';

var timeHelper = function( open, close ){
    var self = this;

    self.open = open;
    self.close = close;
    self.currentUTC = null;

    self.initUTCHour = function(){
        self.currentUTC = new Date( Date() ).getUTCHours();
    }();
    
    self.compareUTCHourRange = function(){
            // If the current UTC hour is after the opening hour and before the closing hour, return 'open'
            
            if ( self.currentUTC >= self.open && self.currentUTC < self.close ) {
                console.log('open');
                return 'open';
            
            // Else, return 'closed'
            
            } else {
                console.log('closed');
                return 'closed';
            
            };
    }
}

module.exports.timeHelper = timeHelper;