$(document).ready(() => {
    console.log("in members.js")
    // Getting references to our form and inputs

    $.get("/api/user_data").then(function(data) {
        $("#member-name").text(data.email);
    });
    
});
  