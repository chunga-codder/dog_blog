$(document).ready(() => {
    console.log("in members.js")

    // Getting user data
    $.get("/api/user_data").then(function(data) {
        let user = data.email
        $("#member-name").text(data.email);
        getUserPosts(user)
    });

    const getUserPosts = (user) => {
        fetch(`/api/blog/user/${user}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Success in getting posts:", data);
            postTitles(data);
        });
    };    

    // Create rows to see each blog post/category
    const postTitles = (data) => {
    const titleArea = document.querySelector("#userPostTitles");
        data.forEach((post) => {
            const newUl = document.createElement("ul");
            newUl.classList.add("list-group");
            newUl.classList.add("text-left");
            titleArea.append(newUl);
        
            const newButton = document.createElement("button");
            newButton.classList.add("list-group-item");
            newButton.classList.add("text-left");
            newButton.classList.add("btn");
            newButton.classList.add("btn-outline-secondary");
            newButton.setAttribute('id', post.id)
            newButton.setAttribute('type', 'button')
            newButton.addEventListener("click", showPost)
            newButton.textContent = post.title
            newUl.append(newButton);
        });
    };
    
    // Function to show the selected post to the use
    const showPost = (e) => {
        e.preventDefault()
        console.log("button clicked")
        id = e.target.id;
        getPostData(id);
    }

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
            $('#title')[0].textContent = data.title
            $('#createDate')[0].textContent = data.createdAt
            $('#update')[0].textContent = data.updatedAt
            $('#category')[0].textContent = data.category
            $('#body')[0].textContent = data.body
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
});
  