
/* 
 *   timeHelper() accepts a start hour and closing hour in UTC.
 *   Its compareUTCHourRange() function checks to see if the 
 *   current UTC time falls between the open and close times.
 *   If so, it toggles .open class to shown, if not, it
 *   toggles .closed class to shown.
*/  

(function() {
    var timeHelper = function( open, close ){
        var self = this;

        self.open = open;
        self.close = close;
        self.currentUTC = null;

        self.initUTCHour = function(){
            self.currentUTC = new Date( Date() ).getUTCHours();
        }
        
        self.compareUTCHourRange = function(){
                // grab the current hour in UTC time
                self.initUTCHour();

                // If the current UTC hour is after the opening hour and before the closing hour, toggle open to 'shown'
                
                if ( self.currentUTC >= self.open && self.currentUTC < self.close ) {

                    $( '.open' ).toggleClass( 'shown' );

                    console.log( 'open for business' );
                
                // Else, toggle closed to 'shown'
                
                } else {
                
                    $( '.closed' ).toggleClass( 'shown' );

                    console.log( 'we\'re closed right now' );
                
                };
        }
    }
  console.log('returning timeHelper');
  console.dir(timeHelper);
  return timeHelper;

})();