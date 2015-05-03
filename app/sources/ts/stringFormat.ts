module App{
    
	export function StringFormat (str, model) {
        // fix images directory
        if (model["id"] >= 10) {
            model["index"] = "0";
        } else {
            model["index"] = "00";
        }

        for(var prop in model){
            if(model.hasOwnProperty(prop)){
                if(prop == "created_at"){
                    let date = new Date(model[prop]);
                    let dd:any = date.getDate();
                    let mm:any = date.getMonth() + 1;
                    let yy:any = date.getFullYear();
					
                    if(dd<10){
                        dd = '0'+dd;
                    } 
					
                    if(mm<10) {
                        mm='0'+mm;
                    }        
                    
					str = str.replace("{created_at}", dd+"/"+mm+"/"+yy);
                }else{
                    var regex = new RegExp("{"+prop+"}", "g");
                    str = str.replace(regex, model[prop]);
                }
            }
        }
        
        return str;
    }
}