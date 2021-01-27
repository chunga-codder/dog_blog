$(document).ready(() => {
    console.log("in blog.js")
    // Getting references to our form and inputs
    const loginForm = $("#postButton");
    const title = $('#title');
    const body = $('#body');
    const username = $('#username');
    const category = $('#category');

    // Check for query string and set flag, "updating", to false initially
    const url = window.location.search;
    let postId;
    let updating = false;

    // Get a specific post
    const getPostData = (id) => {
        console.log(id)
        fetch(`/api/blog/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
            console.log(`Success in grabbing post ${id}`, data);

            // Populate the form with the existing post
            title[0].value = data.title;
            body[0].value = data.body;
            username[0].value = data.username;
            category[0].value = data.category;

            updating = true;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // Extract the post ID from the URL
    if (url.indexOf('?post_id=') !== -1) {
        postId = url.split('=')[1];
        getPostData(postId);
    }
    
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
        } else if(!newPost.username) {
            $("#alert .msg").text(` Username can't be blank`);
            $("#alert").fadeIn(500);
        } else if(!newPost.category) {
            $("#alert .msg").text(` Category can't be blank`);
            $("#alert").fadeIn(500);
        } else {
            $("#alert").addClass("hide")
            if(updating) {
                newPost.id = postId;
                updatePost(newPost)
            } else {
                recordPost(newPost)
            }
            title[0].value = "";
            body[0].value = "";
            username[0].value = "";
            category[0].value = "";
        }
    });

    // Function to create a new post
    const recordPost = (post) => {
        console.log(post)
        $.post("/api/blog1", {
            title: post.title,
            body: post.body,
            username: post.username,
            category: post.category
        }).then(() => {
            $("#alertDone").fadeIn(500);
            window.location.href = '/';
        }).catch((err) => {
            console.log(err)
        })
    };

    // Update a post and bring user to /blog
    const updatePost = (post) => {
        fetch('/api/blog', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
        })
        .then(() => {
            console.log('Attempting update to post');
            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
}); 