// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "webkitNotifications.requestPermission" beforehand).
*/
const SERVER_URL = "serverUrl",
STATUS_FAIL = "FAIL";

function getUrl() {
  if (localStorage.hasOwnProperty(SERVER_URL)) {
    return localStorage.getItem(SERVER_URL);
  } else {
    return null;
  }
}

function checkForDownServices() {
  $.ajax(getUrl()).done(showDownServices);
};

function showDownService(service) {
  var time = /(..)(:..)/.exec(new Date()),
    hour = time[1] % 12 || 12,
    period = time[1] < 12 ? 'a.m.' : 'p.m.',
    notification = window.webkitNotifications.createNotification(
      '/icons/fail.png', // The image.
    hour + time[2] + ' ' + period, // The title.
    'El servicio ' + service.name + ' se encuentra caido.' // The body.
    );
  notification.show();
}

function isServiceDown(service) {
  return (STATUS_FAIL == service.status);
}

function showDownServices(data) {
  $.each(data, function(key, service) {
    if (isServiceDown(service)) {
      showDownService(service);
    }
  });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.serverUrl = DEFAULT_SERVER_URL;
  localStorage.isActivated = DEFAULT_NOTIFICATION_ACTIVE;
  localStorage.frequency = DEFAULT_NOTIFICATION_FREQUENCY;

  localStorage.isInitialized = true;
}


if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
      localStorage.frequency <= interval) {
      checkForDownServices();
      interval = 0;
    }
  }, 60000);
} else {
  window.webkitNotifications.requestPermission();
}