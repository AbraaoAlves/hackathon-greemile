interface Window { jsonp: (request:any)=>void; }

module App {
	export class ServiceDataClass {
		constructor(){ }
		
		get (url, success) {
	        var script = document.createElement('script');
	        var parseUrl = document.createElement("a");
	            parseUrl.href = url;
	        
			if(parseUrl.search == ""){
	            script.src = url+"?callback=jsonp";
	        }else{
	            script.src = url+"&callback=jsonp";
	        }        
	        
			document.body.appendChild(script);
        			
			window.jsonp = function(request){
	            success(request);
	            document.body.removeChild(script);
	            delete window.jsonp;
	        }
	    }
	}
	export var ServiceData = new ServiceDataClass();
}