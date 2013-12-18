var assert = chai.assert;

describe('Testing basic functionality', function() {
  var utcDate = new TimeZoneDate(0, '1/1/2013 11:00 PM');

  it('should create a new TimeZoneDate object', function() {
    assert.ok(utcDate);
  });

  it('should accept both types of timezone offset', function() {
    var offsetsByMinutes = [-360, -300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300, 360];
    var offsetsByHours = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6];

    for (var i = 0; i < offsetsByMinutes.length; i++) {
      assert.equal(new TimeZoneDate(offsetsByMinutes[i])._offset, new TimeZoneDate(offsetsByHours[i])._offset);
    }
  });
});

describe('Test w/ target of UTC', function() {
  var utcDate = new TimeZoneDate(0, '1/10/2013 17:40:30');

  it('should have a time of 17:40:30.00', function() {
    assert.equal(utcDate.getHours(), 17);
    assert.equal(utcDate.getMinutes(), 40);
    assert.equal(utcDate.getSeconds(), 30);
    assert.equal(utcDate.getMilliseconds(), 0);
  });

  it('should have a time of 14:45:23.00', function() {
    utcDate.setHours(14, 45, 23, 12);
    assert.equal(utcDate.getHours(), 14);
    assert.equal(utcDate.getMinutes(), 45);
    assert.equal(utcDate.getSeconds(), 23);
    assert.equal(utcDate.getMilliseconds(), 12);
  });

  it('should span days b/w local and target', function() {
    utcDate.setHours(1, 0, 0, 0);
  });
});

describe('Test w/ target of UTC+3', function() {
  var plus3Date = new TimeZoneDate(3, '12/15/2013 00:00:00');

  it('should have a UTC hours date of 21:00 on the previous day', function() {
    assert.equal(plus3Date.getUTCHours(), 21);
    assert.equal(plus3Date.getUTCDate(), 14);
  });

  plus3Date.setHours(0, 0, 0, 0);
  it('should have a UTC hours date of 21:00 on the previous day', function() {
    assert.equal(plus3Date.getUTCHours(), 21);
    assert.equal(plus3Date.getUTCDate(), 14);
  });
});

describe('Test setting UTC values', function() {
  var plus3Date = new TimeZoneDate(3, '12/15/2013 5:00');
  plus3Date.setUTCHours(0, 0, 0, 0);

  it('should have a time of 3:00AM on 12/15', function() {
    assert.equal(plus3Date.getDate(), 15);
    assert.equal(plus3Date.getHours(), 3);
  });
});
