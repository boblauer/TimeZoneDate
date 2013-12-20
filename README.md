TimeZoneDate
============

A JavaScript Date alternative that is specific to a given timezone other than the current machine's timezone.

## Installation ##
`npm install timezonedate`
## Environment Support ##
TimeZoneDate has been tested in Node, IE9+, Chrome, Firefox, and Opera.
## Usage ##
```javascript
// CommonJS
var TimeZoneDate = require('timezonedate');
```
```javascript
// AMD
require(['timezonedate'], function(TimeZoneDate) { ... });
```
```javascript
// Script Tag
var TimeZoneDate = window.TimeZoneDate;
```

## API ##
```javascript
function TimeZoneDate(offset[, initialDate])
```
#### __offset__

__type__: __`Number`__

There are two ways to specify a timezone offset.

The easiest is by passing in the hours relative to UTC.  So if you want to be specify the timezone one hour behind UTC, you would pass in -1.  For one hour ahead of UTC, you would pass in 1.

The other way to specify the timezone is to pass in what the result of `new Date().getTimezoneOffset()` would be if it were run in the target timezone.  For example, if your system clock is set to UTC-1, `new Date().getTimezoneOffset()` will be 60.  If you are in UTC+1, the result will be -60.  Check out [the MDN getTimezoneOffset documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) for more info.

#### __initialDate__

__type__: __`Date`__ or __`String`__

If a Date object is passed in, the TimeZoneDate will be set to the same moment, rather than the same time.  For example:

```javascript
// Assume the current machine is set to UTC-1
var dateInUTCMinus1 = new Date('1/1/2014 12:00:00');
var dateInUTCPlus1 = new TimeZoneDate(1, dateInUTCMinus1);

dateInUTCMinus1.valueOf() === dateInUTCPlus1.valueOf();
// true

dateInUTCMinus1.toString();
// Wed Jan 01 2014 12:00:00 GMT-0100

dateInUTCPlus1.toString();
// Wed Jan 01 2014 14:00:00 GMT+0100
```
If a string is passed in, the TimeZoneDate will be set to that date/time.  For example:
```javascript
// Assume the current machine is set to UTC-1
var dateInUTCMinus1 = new Date('1/1/2014 12:00:00');
var dateInUTCPlus1 = new TimeZoneDate(1, '1/1/2014 12:00:00');

dateInUTCMinus1.valueOf() === dateInUTCPlus1.valueOf();
// false

dateInUTCMinus1.toString();
// Wed Jan 01 2013 12:00:00 GMT-0100

dateInUTCPlus1.toString();
// Wed Jan 01 2013 12:00:00 GMT+0100
```
If the initialDate parameter is omitted, it is the equivalent of passing in `new Date()`.

__The rest of the API is exactly the same as the native Date object.__
