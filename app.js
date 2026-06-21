require("dotenv").config();
const express = require("express");
const { body, validationResult, matchedData } = require("express-validator");

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

app.post(
  "/new",
  [
    body("messageUser")
      .trim()
      .notEmpty()
      .withMessage("Name can not be empty.")
      .isAlpha()
      .withMessage("Name must only contain alphabet letters.")
      .isLength({ min: 1, max: 20 })
      .withMessage("Name must be between 1 and 20 characters."),

    body("messageUser")
      .trim()
      .notEmpty()
      .withMessage("Message can not be empty.")
      .isLength({ min: 1, max: 500 })
      .withMessage("Message must be between 1 and 500 characters."),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "New message",
        errors: errors.array(),
      });
    }

    const { name, message } = matchedData(req);

    messages.push({
      text: req.body.messageText,
      user: req.body.messageUser,
      added: new Date(),
    });
    res.redirect("/");
  }
);

https: app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
