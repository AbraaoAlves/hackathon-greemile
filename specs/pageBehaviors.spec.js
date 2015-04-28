
describe('index.html behaviors', function() {
    beforeEach(function() {
        browser.get('http://localhost:8080/');
        browser.sleep(3000);//wait load data
    });

    it('shoudl refresh map on click row', function(cb) {
		$('#map').getInnerHtml().then(function  (initMapHtml) {
			
			$('tbody tr').click();
    		browser.sleep(3000); //wait load data
			
			$('#map').getInnerHtml().then(function  (actualMapHtml) {

				expect(initMapHtml).not.toEqual(actualMapHtml);
				cb();
			});
		});
    });
});