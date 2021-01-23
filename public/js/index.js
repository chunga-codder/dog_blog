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
      title: titleInput.value.trin(),
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
        console.log("Success");
        location.reload();
        console.log(post);
      })
      .catch((err) => {
        console.error("Error");
      });
  };

  const formBtn = document.querySelector("#form-btn");

  formBtn.addEventListener("click", createPost);
});
