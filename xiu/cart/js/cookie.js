function setCookie(key,value,options){
    options = options ? options : {};
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        var expi = ";expires="+d;
    }else{
        var expi = "";
    }
//  var path = options.path ? ";path="+options.path : "";
    document.cookie = key+"="+value + expi;
}

function removeCookie(key,options){
    options = options ? options : {};
    options.expires = -1;
    setCookie(key,"smy",options);
}

function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] === key){
            return arr[i].split("=")[1];
        }
        return ""
    }

}