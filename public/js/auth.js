const miFormulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "https://restserver-curso-node-j.herokuapp.com/api/auth/";

miFormulario.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};

  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token, usuario }) => {
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem("email", usuario.correo);
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };

  // let url = window.location.hostname.includes("localhost")
  //   ? "http://localhost:8080/api/auth/google"
  //   : "https://restserver-curso-node-j.herokuapp.com/api/auth/google";

  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ token, ...resp }) => {
      localStorage.setItem("email", resp.usuario.correo);
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch(console.warn);
}

const button = document.getElementById("google_signout");

button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
