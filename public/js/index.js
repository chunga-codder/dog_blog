// Handle page rendering based on category of blog selected

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


// Create Post
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM loaded! 🚀");

  const usernameInput = document.getElementById("usernameInput");
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

  const submitPost = (post) => {
    fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success", res);
        location.reload();
        console.log(post);
      })
      .catch((err) => {
        console.error("Error");
      });
  };

  const formBtn = document.querySelector("#form-btn");
  const blogContainer = document.querySelector("#blog-container");

  formBtn.addEventListener("click", newRow);
});

// See Posts

let posts;

const getPost = () => {
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
    });
  console.log(posts);
};

getPost();


// Create rows to see each blog post/category
const newRow = (post) => {
  const blogContainer = document.querySelector("#blog-container");

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  blogContainer.append(newCard);

  const newBody = document.createElement("div");
  newBody.classList.add("card-body");
  blogContainer.append(newBody);

  const newTitle = document.createElement("h5");
  newTitle.classList.add("card-title");
  newTitle.textContent = "test";
  blogContainer.append(newTitle);

  const newText = document.createElement("p");
  newText.classList.add("card-text");
  newText.textContent = "text-test";
  blogContainer.append(newText); 
};
