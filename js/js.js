/**
 * @author paula
 */


//begin listening for event calls function 
function addButtonListeners() {
	
	// check in console to see registration of button listening function
			
			console.log("addButtonListeners");
	
	//event handlers will exist with the button listening function 
	
/////////////////////////////////////////////////////////////////////	

$("#login").on('click', function() {
	//function validate() {
		console.log('validate');
		var count = 2;
		var un = document.myform.username.value;
		var pw = document.myform.pword.value;
		var valid = false;
		var unArray = ["admin", "Paula", "Jason", "Adam"];  // hardcoded array to use for sample of validation without server side security
		var pwArray = ["letmein", "Password1", "Password2", "Password3"];  // the hardcoded passwords without server;

		for (var i=0; i <unArray.length; i++) {
	
			if ((un == unArray[i]) && (pw == pwArray[i])) {
			valid = true;
			break;
				}
			}

		if (valid) {
		alert ("Login was successful");
			window.location = "http://eventovate.webeldev.com/dev/sprint17_rb/#page";
			return false;
			}//end if 

			var t = " tries";
			if (count == 1) {t = " try"}

			if (count >= 1) {
				alert ("Invalid username and/or password.  You have " + count + t + " left.");
				document.myform.username.value = "";
				document.myform.pword.value = "";
				setTimeout("document.myform.username.focus()", 25);
				setTimeout("document.myform.username.select()", 25);
				count --;
				}

			else {
				alert ("Still incorrect! You have no more tries left!");
				document.myform.username.value = "No more tries allowed!";
				document.myform.pword.value = "";
				document.myform.username.disabled = true;
				document.myform.pword.disabled = true;
				return false;
				}
				
		}); //end function for validation 
	
////////////////////////////////////////////////////////////////////	
	
	

	//Beginning of the submit answers function	
	
	$('#submitanswers').on('click', function()	{ // catch the form's submit event
			
					console.log("button clicked"); //debug to see if caught buton click
			 
			$.ajax({
       			url: 'http://eventovate.webeldev.com/dev/sprint17_rb/submitanswers.php',
                data: {formData : $('#formsubmitanswers').serialize()}, // Convert a form to a JSON string representation
                type: 'post',                   
                async: true,
		
						beforeSend: function() {
                    // This callback function will trigger before data is sent
            	        $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
        	      	},
 				complete: function() {
                    // This callback function will trigger on data sent/received complete
                	    $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
        	       }, 
   				success: function (result) {
                        resultObject.formSubmissionResult = result;
                                    $.mobile.changePage("#guestScore");
        	        },
        		
           		 });    
                      console.log ("answers submitted");  
                      window.alert("answers submitted. Thanks");   
        	return false; // cancel original event to prevent form submitting
        
   		 }); // close the function to catch forms submit event.   


		var resultObject = {
					formSubmissionResult : null  
				}
// end of function handler which submits answers to the database 


//beginning of handler that retrieves the users score from the database 

		$('#getMyScore').on('click', function() {
			
			console.log ("button clicked");
	
					var gID =  (document.getElementById('guest_id').value);
	
					$.ajax({
		            			url: 'http://eventovate.webeldev.com/dev/sprint17_rb/getscore.php',
		                		//data: { guest_id : 'guest_id'},
		                		data: { guest_id : gID},
		               			type: 'post',                   
		                		async: true,
		                
                			success: function (returnedJsonData) {
                			
		                				alert("success");
		    							//$('#yourscore').innerHTML("<p> return </p>");
		    							console.log (returnedJsonData); 
		    							
		    							
		    					var items = new Array();
		    					
		    					
		    						items.push('<p>' + returnedJsonData['firstName'] + ' ' + returnedJsonData['lastName'] + '</p>');
		    						
		    						items.push('<h4> you scored ' + returnedJsonData['correctAnswers'] + ', Well Done!<h4>');
		    				
		    					var output = items.join(''); 
		    					$('#myScore').append(output);  
	    					},//end succes function 
    	
		    				
    				});  // end ajax call  
    		
	
 		}); //end get my score function 
 
/*
 * End of Function to Call score from DB ...this handler calls get score php file
 * 
 */
/* BEGIN CALL FOR SCOREBOARD*/
	$('#getAllScore').bind("click", function () {

				$.ajax({
					     url: 'http://eventovate.webeldev.com/dev/sprint17_rb/getscoreall.php',
						   //type: 'post',                   
						    async: true,
						    
						    success: function (returnedJsonData) {
								alert("get all scores ");
								//console.log (returnedJsonData);	
								
								//------------------------
								var items = new Array();
		    					
		    					$.each(returnedJsonData, function(i,jsonItem){ 
		    						//console.log(returnedJsonData["firstName"] );
		    						items.push('<p>' + jsonItem['firstName'] + ' ' + jsonItem['lastName'] + ' scored ' + jsonItem['correctAnswers'] + '</p>');
		    						//items.push('<p>' + returnedJsonData['lastName'] + '</p>');
		    						// items.push('<h4> you scored ' + returnedJsonData['correctAnswers'] + ', Well Done!<h4>');
		    					});
		    					var output = items.join(''); 
		    					$('#scoreall').append(output);  
								
								
								
								//-----------------------
							},
										                
				
					});//end ajax call*/
					

					
					
				
}); //end scoreboard function

/*END CALL TO GET SCOREBOARD*/


$('#guestBookComment').bind("click", function () {
		
		window.alert("Button Clicked!");

		var currentText= $('#addComment').val();
 		//this takes the content the user inputs into the text field and stores them in a local variable
 
		$('#commentList').append('<li class="commentLI2"><h3 class="commentLIH"> '+ currentText + '</h3></li>'); 

		guestBookListCounter++;

		//going to the data-role list view with the id #commentList it should append this to add the user input 
		
		$('#commentList').listview( 'refresh' );
	
	}); 




} //end addButtonListeners

//gmaps attempt to access google  live maps 
/*
 the function operates based on specific co-ordinates being passed into it
 The assumption is that these coordinates would be passed through from the configuration of the app
 downloaded from the couple with the location of the ceremomy or reception
 */

var myCenter=new google.maps.LatLng(53.338056,-6.259167);

function initialize(){
				        googleMap = document.getElementById('googleMap')
						googleMap.style.height = '500px';
						googleMap.style.width = '320px';
				
						var mapProp = {
						  center:myCenter,
						  zoom:13,
						  mapTypeId:google.maps.MapTypeId.HYBRID
						  };
				
						var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
						
						var marker=new google.maps.Marker({
						  position:myCenter,
					});

				marker.setMap(map);

			}

	google.maps.event.addDomListener(window, 'load', initialize);

