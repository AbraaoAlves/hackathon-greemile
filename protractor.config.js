exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  chromeOnly:true,

  capabilities:{
  	'browserName': 'chrome'
  },

  specs: ['specs/*spec.js'],

  onPrepare: function(){
        //is no angular site
        browser.ignoreSynchronization = true;
    }
}