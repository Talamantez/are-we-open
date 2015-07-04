# is your business open?

timeHelper returns true if your business is currently open

Initialize a timeHelper with Pacific Time hours for weekday and weekend hours:
```
var myTimeHelper = new timeHelper({
    weekdayOpen : 6,
    weekdayClose : 18,
    weekendOpen : 8,
    weekendClose : 17
});
```
# try it out:
```
node are-we-open.js
```

