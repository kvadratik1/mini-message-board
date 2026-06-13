require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  const items = messages
    .map(
      (message) =>
        `<li><strong>${message.user}</strong>: ${message.text} At ${message.added}</li>`
    )
    .join("");
  res.send(`<ul>${items}</ul>`);
});

app.get("/new", (req, res) => {
  res.send(
    `<form method="POST" action="/new">
        <label>Name: <input type="text" name="messageUser"></label>
        <label>Message: <input type="text" name="messageText"></label>
        <button type="submit">Submit</button>
    </form>`
  );
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
