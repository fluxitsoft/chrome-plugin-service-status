

function initOptions(){
	// Initialize the option controls.
  options.serverUrl.value = (localStorage.serverUrl? localStorage.serverUrl : DEFAULT_SERVER_URL);
  options.isActivated.checked = (localStorage.isActivated? JSON.parse(localStorage.isActivated) : DEFAULT_NOTIFICATION_ACTIVE);
  options.frequency.value = (localStorage.frequency? localStorage.frequency : DEFAULT_NOTIFICATION_FREQUENCY);

  saveChanges();
}

function showLoadingMessage(){
	$("#container").addClass("loading");
}

function hideLoadingMessage(){
	$("#container").removeClass("loading");
}



function checkValidUrl(url){
	var validURL = false;

	$.ajax({
	    url: url,
	    timeout: 5000,
	    error: function(error){
	        file_exists = 0;
	    },
	    success: function(){
	        file_exists = 1;
	    },
	    complete: function() {
	        if(file_exists === 1) {
	           validURL = true;
	        } else {
	            validURL = false;
	            alert("Url Invalida");
	        }
	    }
	});

	return validURL;

}

function validateOptions(){
	return true;
}

function saveChanges(e){
	showLoadingMessage();

	if(validateOptions()){
		localStorage.serverUrl = options.serverUrl.value;
 		localStorage.frequency = options.frequency.value;
 		localStorage.isActivated = options.isActivated.checked;
 		localStorage.isInitialized = true;
	}

 	hideLoadingMessage();
}

function bindEvents(){
  $("#saveChanges").bind("click", saveChanges);
}


// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.addEventListener('load', function() {
  initOptions();  	 
  bindEvents();
});