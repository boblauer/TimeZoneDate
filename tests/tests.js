var assert = chai.assert;

describe('Testing basic functionality', function() {
  var offset = new Date().getTimezoneOffset();

  it('should be run with a sys clock of -0600 UTC', function(done) {
    assert.equal(offset, 360);
    done();
  });

  var localDate = new Date('1/1/2013 5:00 PM');
  var utcDate = new TimeZoneDate(0, '1/1/2013 11:00 PM');

  it('should create a new TimeZoneDate object', function(done) {
    assert.ok(utcDate);
    done();
  });

  it('should return the same value as a local date', function(done) {
    assert.equal(utcDate.valueOf(), localDate.valueOf());
    done();
  });
});

describe('Test w/ target of UTC', function() {
  var utcDate = new TimeZoneDate(0, '1/10/2013 17:40:30');

  it('should have a time of 17:40:30.00', function(done) {
    assert.equal(utcDate.getHours(), 17);
    assert.equal(utcDate.getMinutes(), 40);
    assert.equal(utcDate.getSeconds(), 30);
    assert.equal(utcDate.getMilliseconds(), 0);
    done();
  });

  it('should have a time of 14:45:23.00', function(done) {
    utcDate.setHours(14, 45, 23, 12);
    assert.equal(utcDate.getHours(), 14);
    assert.equal(utcDate.getMinutes(), 45);
    assert.equal(utcDate.getSeconds(), 23);
    assert.equal(utcDate.getMilliseconds(), 12);
    done();
  });

  it('should span days b/w local and target', function(done) {
    utcDate.setHours(1, 0, 0, 0);
    assert.equal(utcDate.getHours(), 1);
    assert.equal(utcDate.toString(), utcDate._date.toString());
    done();
  });
});
