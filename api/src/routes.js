const routes = require("express").Router();

const { isAuth, isAdmin } = require("./services/auth");

const InitController = require("./private/InitController");
const CategorieController = require("./controllers/CategorieController");
const PlaylistController = require("./controllers/PlaylistController");
const MovieController = require("./controllers/MovieController");
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ChannelController = require("./controllers/ChannelController");

// Users
routes.post("/users", UserController.create);
routes.put("/users/:_id", UserController.update);

// Session
routes.post("/session", SessionController.session);

// Private Route
routes.get("/private/init/list", isAdmin, InitController.index);
routes.post("/private/init/categories", isAdmin, InitController.createCategory);
routes.post("/private/init/playlist", isAdmin, InitController.createPlaylist);
routes.post("/private/init/playlists", isAdmin, InitController.createPlaylists);
routes.delete("/users/:_id", isAdmin, UserController.delete);

// Middleware
routes.all("*", isAuth);

// Users
routes.get("/users", UserController.index);
routes.get("/users/:_id", UserController.show);

// Categories
routes.get("/categories", CategorieController.index);
routes.get("/categories/playlists", CategorieController.showOnPlaylists);
routes.get("/categories/:_id", CategorieController.show);
routes.post("/categories", CategorieController.create);
routes.put("/categories/:_id", CategorieController.update);
routes.delete("/categories/:_id", CategorieController.delete);

// Channels
routes.get("/channels", ChannelController.index);
routes.get("/channels/categories", ChannelController.showOnCategories);
routes.get(
  "/channels/categories/playlists",
  ChannelController.showOnCategoriesAndPlaylists
);
routes.get("/channels/:_id", ChannelController.show);
routes.post("/channels", ChannelController.create);
routes.put("/channels/:_id", ChannelController.update);
routes.delete("/channels/:_id", ChannelController.delete);

// Playlists
routes.get("/playlists", PlaylistController.index);
routes.get("/playlists/:_id", PlaylistController.show);
routes.post("/playlists", PlaylistController.create);
routes.put("/playlists/:_id", PlaylistController.update);
routes.delete("/playlists/:_id", PlaylistController.delete);

// Playlists
routes.get("/movies", MovieController.index);
routes.get("/movies/:_id", MovieController.show);
routes.post("/movies", MovieController.create);
routes.put("/movies/:_id", MovieController.update);
routes.delete("/movies/:_id", MovieController.delete);

module.exports = routes;
