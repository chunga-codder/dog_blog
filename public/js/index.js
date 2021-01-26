$(document).ready(() => {
    console.log("in index.js")
    $.get("/api/user_data").then(function(data) {
        console.log(data)
        if(data.email) {
            $('#navLogout').removeClass('hide')
        } else {
            $('#navLogin').removeClass("hide")
        };        
    });
    $('#navLogin').on('click', () => {
        window.location.replace("/signin");
    });
    $('#navLogin').on('click', () => {
        window.location.replace("/logout");
    });
}); 