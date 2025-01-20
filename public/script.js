document.getElementById("sign-up-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("https://your-api-url.com/api/v1/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    });
  
    if (response.ok) {
      alert("User signed up successfully!");
    } else {
      alert("Error signing up.");
    }
  });
  