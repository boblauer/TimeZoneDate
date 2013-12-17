function TimeZoneDate(offset, date) {
  this._offset = offset;
  this._date = date ? new Date(date) : new Date();

  this._date = this._getDateWithLocalOffsetAdded();
}

TimeZoneDate.prototype._getDateWithTargetOffsetAdded = function(date) {
  var localOffset = new Date().getTimezoneOffset() * 60 * 1000;
  var targetOffset = this._offset * 60 * 1000;

  var ms = +(date || this._date) + localOffset - targetOffset;
  return new Date(ms);
};

TimeZoneDate.prototype._getDateWithLocalOffsetAdded = function(date) {
  var localOffset = new Date().getTimezoneOffset() * 60 * 1000;
  var targetOffset = this._offset * 60 * 1000;

  var ms = +(date || this._date) - localOffset + targetOffset;
  return new Date(ms);
};

'getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear'
.split(' ').forEach(function(fn) {
  if (Date.prototype[fn]) {
    TimeZoneDate.prototype[fn] = function() {
      var targetDate = this._getDateWithTargetOffsetAdded();
      return Date.prototype[fn].apply(targetDate, arguments);
    };
  }
});

'setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear'
.split(' ').forEach(function(fn) {
  if (Date.prototype[fn]) {
    TimeZoneDate.prototype[fn] = function() {
      var getFn = fn.replace('set', 'get');

      this._date = this._getDateWithTargetOffsetAdded();
      Date.prototype[fn].apply(this._date, arguments);
      this._date = this._getDateWithLocalOffsetAdded();

      return this[getFn] ? this[getFn]() : this._date.valueOf();
    };
  }
});

TimeZoneDate.prototype.toString = function() {
  var date = this._getDateWithTargetOffsetAdded();
  return Date.prototype.toString.apply(date, arguments);
};

TimeZoneDate.prototype.valueOf = function() {
  return this._date.valueOf();
};
