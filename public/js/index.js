// Handle page rendering based on category of blog selected

$(document).ready(function () {
  // Seeing if a user is logged in and will display certain elements on the navbar if true
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    if (data.email) {
      $("#navLogout").removeClass("hide");
    } else {
      $("#navLogin").removeClass("hide");
    }
  });
  $("#navLogin").on("click", () => {
    window.location.replace("/signin");
  });
  $("#navLogin").on("click", () => {
    window.location.replace("/logout");
  });

  // Hiding the parks container until clicked and hiding the form.
  function mainScreen() {
    $("#parks-section").hide();
    $("#form-container").hide();
  }

  mainScreen();

  $("#general-btn").on("click", function () {
    $("#parks-section").hide();
    $("#blog-container").show();
    $("#form-container").hide();
  });

  $("#parks-btn").on("click", function () {
    $("#parks-section").show();
    $("#blog-container").hide();
    $("#form-container").hide();
  });
});

// Code to query the database then render all of the blog posts to the front end.
let posts;

const getPost = (blogPost) => {
  fetch("/api/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success in getting posts:", data);
      posts = data;
      newRow(posts);
      console.log(posts);
    });
};

getPost();


// Create rows to see each blog post/category
const newRow = (data) => {
  const blogContainer = document.querySelector("#blog-container");

  data.forEach((post) => {
    const newCardSize = document.createElement("div");
    newCardSize.classList.add("col-md-12");
    blogContainer.append(newCardSize);

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCardSize.append(newCard);

    const newBody = document.createElement("div");
    newBody.classList.add("card-body");
    newBody.setAttribute("id", post.id);
    newCard.append(newBody);

    const newTitle = document.createElement("h5");
    newTitle.classList.add("card-title");
    newTitle.textContent = post.title;
    newBody.append(newTitle);

    const newText = document.createElement("p");
    newText.classList.add("card-text");
    newText.textContent = post.body;
    newBody.append(newText);

    const editButton = document.createElement("button");
    editButton.classList.add("edit", "btn", "btn-primary");
    editButton.setAttribute("id", post.id)
    editButton.textContent = "Edit Post";
    editButton.addEventListener("click", updateTheBlog);

    newBody.append(editButton);

    const delButton = document.createElement("button");
    delButton.classList.add("delete", "btn", "btn-primary");
    delButton.setAttribute("id", post.id)
    delButton.textContent = "Delete Post";
    delButton.addEventListener("click", delTheBlog);
    newBody.append(delButton);
  });
};

// Functions to delete a blog from the database
const deleteBlog = (id) => {
  fetch(`/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    location.reload();
  });
};

const delTheBlog = (e) => {
  e.preventDefault();
  const currentPostId = e.target.id
  deleteBlog(currentPostId);
};

// Functions to update a blog post
const updateTheBlog = (e) => {
  e.preventDefault();
  console.log(e.target.id)
  console.log("in updateTheBlog");
  const currentPostId = e.target.id
  console.log('handlePostDelete -> currentPost', currentPostId);
  window.location.href = `/blog?post_id=${currentPostId}`;
};