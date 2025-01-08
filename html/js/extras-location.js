//Author: Stephen Cirelli
//---------------------------------------------------------
// Desc: Converts a string in the form of a URL's query portion (everything after the ?) to an obj
// Example: str = 'var1=hi&var2=bye' output would be {var1:'hi', var2:'bye'}
//---------------------------------------------------------
function queryStrToObj( str ){
    var str = str.split('&');
    var obj = new Object();
    for( var i=0; i<str.length; i++){
        var tmp = str[i].split('=');
        obj[tmp[0]] = unescape(tmp[1]);
    }
    return obj;
}

function baseURL( ){
    var port = window.location.port ? ':' + window.location.port : '';
    var tmp = window.location.pathname.split('/'),
        path = '';
    for( var i=0; i<tmp.length-1; i++ ) path += tmp[i] + '/';
    return window.location.protocol + '//' + window.location.hostname + port + path;
}

function origin(){
    return window.location.protocol + '//' + window.location.host;
}

//---------------------------------------------------------
// Desc: Converts the query portion of the current URL to a obj
//---------------------------------------------------------
function searchtoObj(){
    var str = window.location.search;
    return queryStrToObj(str.substr(1,str.length));
}

//---- Build the query string obj ----
window.location.searchObj =  searchtoObj();
window.location.baseURL   = baseURL();
if( !window.location.origin ) window.location.origin = origin();

/*
window.location.prototype.searchObj = function(){
    var str = this.search.substr(1, this.length).split('&');
    var obj = new Object();
    for( var i=0; i<str.length; i++){
        var tmp = str[i].split('=');
        obj[tmp[0]] = tmp[1];
    }
    return obj;
}
*/
