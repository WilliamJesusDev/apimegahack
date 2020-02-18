const routes = require("express").Router();

const { isAuth } = require("../services/auth");

const CategorieController = require("../controllers/CategorieController");
const PlaylistController = require("../controllers/PlaylistController");
const MovieController = require("../controllers/MovieController");
const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/SessionController");
const ChannelController = require("../controllers/ChannelController");
const ProfileController = require("../controllers/ProfileController");

// Users
routes.post("/users", UserController.create);
routes.put("/users/:_id", UserController.update);

// Session
routes.post("/session", SessionController.session);

// Middleware
routes.all("*", isAuth);

// Users
routes.get("/users", UserController.index);
routes.get("/users/:_id", UserController.show);
// routes.delete("/users/:_id", UserController.delete);

// Profile
routes.get("/profile", ProfileController.index);
routes.get("/profile/:_id", ProfileController.show);
routes.put("/profile/:_id", ProfileController.update);
routes.put("/profile/:_id/pass", ProfileController.updatePass);
routes.post("/profile/:_id/playlists", ProfileController.addPlaylists);
routes.post("/profile/:_id/categories", ProfileController.addCategories);

// Channels
routes.get("/channels/categories", ChannelController.showOnCategories);
routes.get("/channels/categories/playlists", ChannelController.showOnPlaylists);
routes.get("/channels", ChannelController.index);
routes.get("/channels/:_id", ChannelController.show);
routes.post("/channels", ChannelController.create);
routes.post("/channels/:_id", ChannelController.createByUser);
routes.put("/channels/:_id", ChannelController.update);
routes.delete("/channels/:_id", ChannelController.delete);

// Categories
routes.get("/categories", CategorieController.index);
routes.get("/categories/playlists", CategorieController.showOnPlaylists);
routes.get("/categories/:_id", CategorieController.show);
// routes.post("/categories", CategorieController.create);
// routes.put("/categories/:_id", CategorieController.update);
// routes.delete("/categories/:_id", CategorieController.delete);

// Playlists
routes.get("/playlists", PlaylistController.index);
routes.get("/playlists/:_id", PlaylistController.show);
// routes.post("/playlists", PlaylistController.create);
// routes.put("/playlists/:_id", PlaylistController.update);
// routes.delete("/playlists/:_id", PlaylistController.delete);

// Movies
routes.get("/movies", MovieController.index);
routes.get("/movies/:_id", MovieController.show);
// routes.post("/movies", MovieController.create);
// routes.put("/movies/:_id", MovieController.update);
// routes.delete("/movies/:_id", MovieController.delete);

routes.all("*", (req, res) => {
  return res.status(404).json({ message: "Path Not Found!" });
});

module.exports = routes;
