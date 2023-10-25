const readButton = document.getElementById("readsample");
const readDiv = document.getElementById("read");

readButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/sample").then((response) => {
    return response.json().then((sample) => {
      for (el of sample) {
        const p = document.createElement("p");
        p.innerText = el.name + " " + el.bool;
        console.log(sample);
        readDiv.append(p);
      }
    });
  });
});

const createButton = document.getElementById("createsample");

createButton.addEventListener("click", (event) => {
  const createtext = document.getElementById("createtext").value;
  event.preventDefault();

  const requestBody = {
    name: createtext,
    bool: true,
  };

  console.log(requestBody);
  fetch("/sample", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data created: ", data);
    });
});

const deletebutton = document.getElementById("deletesample");

deletebutton.addEventListener("click", (event) => {
  const deleteId = document.getElementById("deleteid").value;

  event.preventDefault();
  fetch(`/sample/${deleteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("Resource deleted successfully.");
    } else if (response.status === 404) {
      console.log("not found");
    } else {
      console.error("Error deleting resource. Status code: " + response.status);
    }
    return;
  });
});
