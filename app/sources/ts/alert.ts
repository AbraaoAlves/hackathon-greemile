module App{
    export class AlertClass {
		el:HTMLElement;
        
        constructor(){
        	this.el = document.getElementById("alert");
		}
        
        inf (str) {
            this.el.innerHTML = str;
            this.el.setAttribute("class", "alert alert-info");
        }
        hide(){
            this.el.innerHTML = "";
            this.el.setAttribute("class", "");
        }
    }
    export var Alert = new AlertClass();		
}
