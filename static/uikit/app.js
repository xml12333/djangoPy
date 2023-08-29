let alertWrapper = document.querySelector(".alert");
let alertClose = document.getElementsByClassName("alert__close");

function closeAlert() {
  messageAlerts = document.getElementsByClassName(alertWrapper.className);
  var i;
  for (i = 0; i < messageAlerts.length; i++) {
    messageAlerts[i].style.display = "none";
  }
}
if (alertWrapper) {
  var i;
  for (i = 0; i < alertClose.length; i++) {
    alertClose[i].addEventListener("click", closeAlert);
  }
}


