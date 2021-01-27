$(document).ready(() => {
    console.log("in blog.js")
    // Getting references to our form and inputs
    const loginForm = $("#postButton");
    const title = $('#title');
    const body = $('#body');
    const username = $('#username');
    const category = $('#category');
    
    // When the form is submitted, we view the post title, body, and author
    loginForm.on("click", (e) => {
        e.preventDefault();
        let newPost = {
          title: title[0].value.trim(),
          body: body[0].value.trim(),
          username: username[0].value.trim(),
          category: category[0].value.trim()
        };
        if(!newPost.title) {
            $("#alert .msg").text(` Title can't be blank`);
            $("#alert").fadeIn(500);
        } else if(!newPost.body) {
            $("#alert .msg").text(` Body can't be blank`);
            $("#alert").fadeIn(500);
        } else if(!newPost.category) {
            $("#alert .msg").text(` Username can't be blank`);
            $("#alert").fadeIn(500);
        } else if(!newPost.category) {
            $("#alert .msg").text(` Category can't be blank`);
            $("#alert").fadeIn(500);
        } else {
            recordPost(newPost)
        }
    });

    const recordPost = (post) => {
        console.log(post)
        $.post("/api/blog1", {
            title: post.title,
            body: post.body,
            username: post.username,
            category: post.category
        }).then(() => {
            $("#alertDone").fadeIn(500);
        }).catch((err) => {
            console.log(err)
        })
    }
}); 