// Handle page rendering based on category of blog selected

$(document).ready(function () {
  function mainScreen() {
    $("#parks-section").hide();
  }

  mainScreen();

  $("#general-btn").on("click", function () {
    $("#parks-section").hide();
    $("#blog-container").show();
    $("#form-container").show();
  });

  $("#parks-btn").on("click", function () {
    $("#parks-section").show();
    $("#blog-container").hide();
    $("#form-container").hide();
  });
});

// Create Post
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM loaded! 🚀");

  let usernameInput = document.getElementById("usernameInput");
  const titleInput = document.getElementById("titleInput");
  const bodyInput = document.getElementById("bodyInput");

  const createPost = (e) => {
    e.preventDefault();
    if (!titleInput.value || !bodyInput.value) {
      alert("Your post is missing some content");
    }

    const newPost = {
      //   username: usernameInput.value.trim(),
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
      // category: postCategorySelect.value,
    };
    console.log("createPost -> newPost", newPost);
    // Check if the user is updating or creating and preform said function
    //   if (updating) {
    //     newPost.id = postId;
    //     updatePost(newPost);
    //   } else {
    submitPost(newPost);
    //   }
  };

  const submitPost = (blogPost) => {
    fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogPost),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success", res);
        titleInput.value = " ";
        bodyInput.value = " ";
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const formBtn = document.querySelector("#form-btn");
  const blogContainer = document.querySelector("#blog-container");

  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newRow(e);
    console.log(usernameInput, titleInput, bodyInput);
    if (!usernameInput) {
      usernameInput = "noUserName";
    }
    submitPost(newRow);
    getPost();
  });
});

// See Posts

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
      for (let i = 0; i < posts.length; i++) {
        newRow(posts);
        console.log(posts[i]);
      }
    });
};

getPost();

// Create rows to see each blog post/category
const newRow = (data) => {
  const blogContainer = document.querySelector("#blog-container");

  const newCardSize = document.createElement("div");
  newCardSize.classList.add("col-md-4");
  blogContainer.append(newCardSize);

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCardSize.append(newCard);

  const newBody = document.createElement("div");
  newBody.classList.add("card-body");
  newCard.append(newBody);

  const newTitle = document.createElement("h5");
  newTitle.classList.add("card-title");
  newTitle.textContent = titleInput.value;
  console.log(titleInput.value);
  newBody.append(newTitle);

  const newText = document.createElement("p");
  newText.classList.add("card-text");
  newText.textContent = bodyInput.value;
  newBody.append(newText);

  const editButton = document.createElement("a");
  editButton.classList.add("btn", "btn-primary");
  editButton.textContent = "Edit Post";
  newBody.append(editButton);

  const delButton = document.createElement("a");
  delButton.classList.add("btn", "btn-primary");
  delButton.textContent = "Delete Post";
  newBody.append(delButton);
  newCard.setAttribute("data-post", JSON.stringify(data));
  return newCard;
};
