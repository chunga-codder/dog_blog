$(document).ready(function () {
  console.log("index js");

  function mainScreen() {
    $("#parks-section").hide();
  }

  mainScreen();

  $("#general-btn").on("click", function () {
    $("#parks-section").hide();
  });

  $("#parks-btn").on("click", function () {
    $("#parks-section").show();
  });
});
