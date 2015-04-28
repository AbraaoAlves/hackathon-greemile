/// get start with protractor: http://angular.github.io/protractor/#/tutorial

describe('index.html page ', function() {
  beforeEach(function(){
    browser.get('http://localhost:8080/');

  })
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Hackathon Greenmile');
  });

  it('should have empty tbody', function(cb){
	var tbody = $('table tbody');

	tbody.getInnerHtml().then(function  (html) {
		expect(html).toBe('');
		cb();
	});
  });

  it('should have filled tbody after 3 seconds', function(cb){
	var tbody = $('table tbody');
	 browser.sleep(3000);

	tbody.getInnerHtml().then(function  (html) {
		expect(html).not.toBe('');
		cb();
	});
  });

});