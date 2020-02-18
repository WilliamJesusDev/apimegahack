const routes = require("express").Router();

const { isAdmin } = require("../services/auth");

const InitController = require("../private/InitController");

// Middleware
routes.all("*", isAdmin);

// Private Route
routes.get("/init/list", InitController.index);
routes.post("/init/categories", InitController.createCategory);
routes.post("/init/playlist", InitController.createPlaylist);
routes.post("/init/playlists", InitController.createPlaylists);

module.exports = routes;
