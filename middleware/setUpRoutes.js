const loginRouter = require("../routes/login");

module.exports = function (app) {
  app.use("/login", loginRouter);

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("*", (req, res) => {
    res.render("404");
  });
};