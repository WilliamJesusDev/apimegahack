const api = require("../services/api");

const Categorie = require("../models/Categorie");
const Channel = require("../models/Channel");
const Movie = require("../models/Movie");
const Playlist = require("../models/Playlist");

async function addMovies(allPlaylists) {
  await allPlaylists.map(async function(playlist) {
    const { _id: playlistId } = playlist;
    await api
      .get("/playlistItems/", {
        params: {
          key: process.env.API_KEY,
          part: "id,snippet",
          playlistId,
          maxResults: "50"
        }
      })
      .then(response => {
        response.data.items.map(async function(item) {
          const {
            id: _id,
            snippet: {
              publishedAt,
              title,
              description,
              thumbnails,
              playlistId: playlist,
              resourceId: { videoId }
            }
          } = item;

          await Movie.updateOne(
            { _id, videoId },
            {
              _id,
              publishedAt,
              title,
              description,
              thumbnails,
              playlist,
              videoId
            },
            { upsert: true, new: true }
          );
        });
      });
  });
  console.log("Ok DB Initialized!");
  return;
}

module.exports = {
  async createCategory(req, res) {
    await api
      .get("/videoCategories/", {
        params: {
          key: process.env.API_KEY,
          part: "id,snippet",
          regionCode: "BR",
          hl: "pt_BR"
        }
      })
      .then(response => {
        response.data.items.map(async function(item) {
          const {
            id: _id,
            snippet: { title }
          } = item;

          await Categorie.findOneAndUpdate(
            { _id },
            { _id, title },
            { upsert: true, new: true }
          );
        });
      });

    const categorie = await Categorie.find();

    return res.json(categorie);
  },
  async createPlaylists(req, res) {
    const { channelNumber = "", categorie = 0 } = req.query;

    await api
      .get("/playlists/", {
        params: {
          key: process.env.API_KEY,
          part: "id,snippet",
          channelId:
            channelNumber !== "" ? channelNumber : "UCEPRQVF6hxGGM9gi1ELaWHg",
          maxResults: "50"
        }
      })
      .then(response => {
        response.data.items.map(async function(item) {
          const {
            id: _id,
            snippet: { publishedAt, title, description, thumbnails }
          } = item;

          if (categorie !== 0) {
            await Playlist.findOneAndUpdate(
              { _id },
              {
                _id,
                publishedAt,
                title,
                description,
                thumbnails,
                categorie
              },
              { upsert: true, new: true }
            );
          } else {
            await Playlist.findOneAndUpdate(
              { _id },
              {
                _id,
                publishedAt,
                title,
                description,
                thumbnails
              },
              { upsert: true, new: true }
            );
          }
        });
      });
    const playlists = await Playlist.find();

    addMovies(playlists);

    return res.json(playlists);
  },
  async createPlaylist(req, res) {
    const { playlistNumber = "", categorie = 0 } = req.query;

    await api
      .get("/playlists/", {
        params: {
          key: process.env.API_KEY,
          part: "id,snippet",
          id: playlistNumber !== "" ? playlistNumber : "",
          maxResults: "50"
        }
      })
      .then(response => {
        response.data.items.map(async function(item) {
          const {
            id: _id,
            snippet: { publishedAt, title, description, thumbnails }
          } = item;

          if (categorie !== 0) {
            await Playlist.findOneAndUpdate(
              { _id },
              {
                _id,
                publishedAt,
                title,
                description,
                thumbnails,
                categorie
              },
              { upsert: true, new: true }
            );
          } else {
            await Playlist.findOneAndUpdate(
              { _id },
              {
                _id,
                publishedAt,
                title,
                description,
                thumbnails
              },
              { upsert: true, new: true }
            );
          }
        });
      });
    const playlist = await Playlist.find({ _id: playlistNumber });

    addMovies(playlist);

    return res.json(playlist);
  },
  async index(req, res) {
    const response = await Channel.find()
      .sort("_id")
      .populate({
        path: "categories",
        select: "_id title playlists",
        populate: {
          path: "playlists",
          select: "_id title description movies -categorie",
          populate: {
            path: "movies",
            select: "_id title description -playlist"
          }
        }
      });

    let channelsResponse = response.filter(
      channel => channel.categories.length > 0
    );

    const channels = channelsResponse.filter(channel =>
      channel.categories.filter(categorie => categorie.playlists.length > 0)
    );

    return res.json(channels);
  }
};
