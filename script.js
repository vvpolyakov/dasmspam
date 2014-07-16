$.mobile.ignoreNextHashChange = true;
$.mobile.defaultPageTransition = 'none';
var period = 1;
var go = 0;


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

    $("#message").val(localStorage['dasmspam-message']);
    $("#phones").val(localStorage['dasmspam-phones']);
    $("#complete").val(localStorage['dasmspam-complete']);

//    document.addEventListener("menubutton", function(e){
//    },false);
//    document.addEventListener("backbutton", function(e){
//    }, false);

    $("#snd").click(function(){go=1});
/*
             $("#snd").click(function(){
            	    cordova.exec(
            		 function () { 
			       alert('Message sent successfully');  
			},
			function (e) {
			    alert('Message Failed:' + e);
			},
			 'SmsPlugin', "SEND_SMS", ["+79067180263", "hello world",""]);
             });
*/


    $("#import").click(function(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
   });


    interval();
}
init.called=false;

document.addEventListener("deviceready", init, true);
$(init); 

var interval = function () {
    setTimeout(function(){
	interval();
	if (go)send();
	localStorage['dasmspam-message']=$("#message").val();
	localStorage['dasmspam-phones']=$("#phones").val();
	localStorage['dasmspam-complete']=$("#complete").val();
	$("#countPhones").html($("#phones").val().split(/\n/).length-1);
	$("#countComplete").html($("#complete").val().split(/\n/).length-1);
	$("#countMessage").html($("#message").val().length);
    },period*1000);
}

var send = function() {
    arr=$("#phones").val().split(/\n/);
    var tel = arr.shift();
    if (tel){
    //sendng
	go=0;
/*
	cordova.exec(
    	    function () { 
		//alert('Message sent successfully');  
		$("#phones").val(arr.join("\n"));
		$("#complete").val(tel+"\n"+$("#complete").val());
		go=1;
	    },
	    function (e) {
		alert('Message Failed:' + e);
	    },
	    'SmsPlugin', "SEND_SMS", [tel, $("#message").val(),""]);
*/
    } else {
	alert("Complete!");
    }
}
