$.mobile.ignoreNextHashChange = true;
$.mobile.defaultPageTransition = 'none';
var period = 1;
var go = 0;
var phones = [];
var result = [];
var message = "";


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

//    $("#message").val(localStorage['dasmspam-message']);
//    $("#phones").val(localStorage['dasmspam-phones']);
//    $("#complete").val(localStorage['dasmspam-complete']);

//    document.addEventListener("menubutton", function(e){
//    },false);
//    document.addEventListener("backbutton", function(e){
//    }, false);

    //localStorage['dasmspam']);
    imprt(JSON.parse(localStorage['dasmspam'] ?localStorage['dasmspam']:"{}" ));
    
    $("#snd").click(function(){go=1});


    $("#import").click(function(){
    $.mobile.loading( "show", {
      text: "foo",
        textVisible: true,
          theme: "z",
            html: ""
            });
    cordova.plugins.barcodeScanner.scan(
      function (result) {
    	    $.get(result.text,function(data){
    		$.mobile.loading().hide();
    		imprt(data);
    	    },"json");
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
	localStorage['dasmspam']=JSON.stringify({message:message,result:result,phones:phones});
	$("#countPhones").html(result.length+" / "+phones.length);
//	$("#countComplete").html($("#complete").val().split(/\n/).length-1);
//	$("#countMessage").html($("#message").val().length);
    },period*1000);
}

var imprt = function(data) {
	$("#message").html(data.message);
	message = data.message?data.message :"";
    	phones = typeof (data.phones) == 'string'?data.phones.split(/\n/):typeof(data.phones)=='object'?data.phones:[];
    	result = typeof (data.result) == 'object'?data.result: [];
    	var html = "<table>";
    	for(var i in phones){
    	    html += "<tr><td id=\"result"+i+"\" style=\"padding:0 10px; color:green; font-weight:bold\">"+(result[i]?"OK":"")+"</td><td>"+phones[i]+"</td></tr>";
    	}
    	html += "</table>";
    	$("#phones").html(html);

}

var send = function() {
    //arr=$("#phones").val().split(/\n/);
    //var tel = arr.shift();
    var tel = "";
    for (var i=0;i<phones.length;i++){
	if (!result[i] && phones[i]) {
	    tel=phones[i];
	    break;
	}
    }
    if (tel){
    //sendng
//	go=0;
	
		
	
	cordova.exec(
    	    function () { 
		//alert('Message sent successfully');  
		//$("#phones").val(arr.join("\n"));
		//$("#complete").val(tel+"\n"+$("#complete").val());
		result[i] = 1;
		$("#result"+i).html("OK");
		
		go=1;
	    },
	    function (e) {
		alert('Message Failed:' + e);
	    },
	    'SmsPlugin', "SEND_SMS", [tel, message,""]);

    } else {
	go=0;
	alert("Complete!");
    }
}
