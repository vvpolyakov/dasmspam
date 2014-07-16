$.mobile.ignoreNextHashChange = true;
$.mobile.defaultPageTransition = 'none';


$(document).on("pageinit", function(event){
  // initial configuration
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.pushStateEnabled = false;
});
        
var init=function(){
    if (init.called) {
        return;
    }
    init.called = true;


    document.addEventListener("menubutton", function(e){
    },false);
    document.addEventListener("backbutton", function(e){
    }, false);

             $("#snd").click(function(){
            	    alert(1);
            	    cordova.exec(
            		 function () { 
			       alert('Message sent successfully');  
			},
			function (e) {
			    alert('Message Failed:' + e);
			},
			 'SmsPlugin', "SEND_SMS", ["+79067180263", "hello world","INTENT"]);
/*	            SmsPlugin.prototype.send('+79067180263', 'Your Message Here!', 'INTENT',
				    function () { 
				       alert('Message sent successfully');  
				    },
				    function (e) {
				        alert('Message Failed:' + e);
				    }
				);               
*/
		alert(2);
             });

}
init.called=false;

document.addEventListener("deviceready", init, true);
$(init); 
