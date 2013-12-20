(function(name, definition) {
    if (typeof module !== 'undefined') module.exports = definition();
    else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
    else this[name] = definition();
}('TimeZoneDate', function() {

  function TimeZoneDate(offset, date) {
    this._offset = this._normalizeOffset(offset);

    if (!date) {
      this._date = this._getDateWithTargetOffsetAdded(new Date());
      date = this._date.toString();
    }

    this._date = new Date(date);
    this._date = this._getDateWithLocalOffsetAdded();
  }

  TimeZoneDate.prototype._normalizeOffset = function(offset) {
    // offset can be in 2 forms.  Either the results of new Date().getTimezoneOffset(),
    // or the hours away from UTC (-6 for UTC -0600).
    if (offset % 30) {
      offset = offset * -60;
    }

    return offset;
  };

  TimeZoneDate.prototype._getTimezoneDisplayValue = function() {
    var isPositive = this._offset < 0;
    var hours = ((this._offset / -60) * 100).toString();
    while (hours.length < 4) {
      hours = '0' + hours;
    }

    return (isPositive ? '+' : '-') + hours;
  };

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

  var getFns = [];
  var setFns = [];
  var toStringFns = [];

  Object.getOwnPropertyNames(Date.prototype).forEach(function(fnName) {
    if (/^get/.test(fnName)) {
      getFns.push(fnName);
    } else if (/^set/.test(fnName)) {
      setFns.push(fnName);
    } else if (/^to(.*)String$/.test(fnName)) {
      toStringFns.push(fnName);
    }
  });

  getFns.forEach(function(fnName) {
    TimeZoneDate.prototype[fnName] = function() {
      var isUTCGet = /^getUTC/.test(fnName);
      var targetDate = isUTCGet ? this._date : this._getDateWithTargetOffsetAdded();
      return Date.prototype[fnName].apply(targetDate, arguments);
    };
  });

  setFns.forEach(function(fnName) {
    TimeZoneDate.prototype[fnName] = function() {
      var isUTCSet = /^setUTC/.test(fnName);
      var getFn = fnName.replace('set', 'get');

      this._date = isUTCSet ? this._date : this._getDateWithTargetOffsetAdded();
      Date.prototype[fnName].apply(this._date, arguments);
      this._date = isUTCSet ? this._date : this._getDateWithLocalOffsetAdded();

      return this[getFn] ? this[getFn]() : this._date.valueOf();
    };
  });

  toStringFns.forEach(function(fnName) {
    TimeZoneDate.prototype[fnName] = function() {
      var stringDate = Date.prototype[fnName].apply(this._getDateWithTargetOffsetAdded(), arguments);
      stringDate = stringDate.replace(/GMT.*/, 'GMT' + this._getTimezoneDisplayValue());

      return stringDate;
    };
  });

  TimeZoneDate.prototype.toJSON = function() {
    return this._date.toJSON();
  };

  TimeZoneDate.prototype.valueOf = TimeZoneDate.prototype.getTime = function() {
    return this._date.valueOf();
  };

  return TimeZoneDate;
}));
