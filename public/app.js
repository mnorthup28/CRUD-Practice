const readButton = document.getElementById("readsample");
const readDiv = document.getElementById("read");

readButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/sample")
    .then((response) => {
      return response.json().then((sample) => {
        for (el of sample) {
          const p = document.createElement("p");
          p.innerText = el.name + " " + el.bool;
          console.log(sample);
          readDiv.append(p);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      console.log("error is in read");
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
    })
    .catch((err) => {
      console.error(err);
      console.log("the issue is create");
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
  })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});

const updatebutton = document.getElementById("updatesample");

updatebutton.addEventListener("click", (event) => {
  const updatenamevalue = document.getElementById("updatename").value;
  const updateId = document.getElementById("updatenameid").value; // Retrieve the value, not the element

  event.preventDefault();

  const updateData = {
    name: updatenamevalue,
  };

  fetch(`/sample/${updateId}`, {
    method: "PATCH", // Use the PATCH method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData), // Send the update data, not just the name
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update data");
      }
    })
    .then((data) => {
      console.log("Data updated:", data);
      // Optionally, update the UI to reflect the change
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      // Handle errors and provide user feedback if necessary
    });
});
