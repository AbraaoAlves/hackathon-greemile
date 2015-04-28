
// spec.js
describe('Load Page spec', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8080/');

    expect(browser.getTitle()).toEqual('Hackathon Greenmile');
  });
});