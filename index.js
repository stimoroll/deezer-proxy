const axios = require('axios');
const cors = require('cors');
const express = require("express");

const ep_artist = (artist) => `https://api.deezer.com/artist/${artist}`;
const ep_search = (artist) => `https://api.deezer.com/search/artist?q=${artist}&limit=5&index=0`;//&index=0&limit=200&output=json
const ep_searchex = (query) => `https://api.deezer.com/search/artist?q=${query}&index=0`;//&index=0&limit=200&output=json
const ep_album = (id) => `https://api.deezer.com/album/${id}`;
const ep_albums = (id) => `https://api.deezer.com/search/album?q=${id}`;
const ep_albumsex = (id) => `https://api.deezer.com/search?q=artist:"${id}"`;

const app = express();
app.options('*', cors());

// app.options('/search', function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.end();
// });

app.get("/search/:artist", (ex_req, ex_res, next) => {
  const artist = ex_req.params.artist;
  if(artist && artist.length > 0) {
    axios.get(ep_search(artist)).then(ax_res => {
      ex_res.setHeader("Access-Control-Allow-Origin", "*");
      ex_res.setHeader('Access-Control-Allow-Methods', '*');
      ex_res.setHeader("Access-Control-Allow-Headers", "*");      
      ex_res.send(ax_res.data);
    });
  }
});

app.get("/searchex/:artist", (ex_req, ex_res, next) => {
  const artist = ex_req.params.artist;
  if(artist && artist.length > 0) {
    axios.get(ep_searchex(artist)).then(ax_res => {
      ex_res.setHeader("Access-Control-Allow-Origin", "*");
      ex_res.setHeader('Access-Control-Allow-Methods', '*');
      ex_res.setHeader("Access-Control-Allow-Headers", "*");      
      ex_res.send(ax_res.data);
    });
  }
});

app.get("/artist/:artist", (ex_req, ex_res, next) => {
  const artist = ex_req.params.artist;
  if(artist && artist.length > 0) {
    axios.get(ep_artist(artist)).then(ax_res => {
      ex_res.setHeader("Access-Control-Allow-Origin", "*");
      ex_res.setHeader('Access-Control-Allow-Methods', '*');
      ex_res.setHeader("Access-Control-Allow-Headers", "*");
      ex_res.send(ax_res.data);
    });
  }
});

/** universal fn for app.get */
const set_get = (ep_local, ep_origin) => {
  app.get(ep_local, (ex_req, ex_res, next) => {
    const id = ex_req.params.id;
    if(id && id.length > 0) {
      axios.get(ep_origin(id)).then(ax_res => {
        ex_res.setHeader("Access-Control-Allow-Origin", "*");
        ex_res.setHeader('Access-Control-Allow-Methods', '*');
        ex_res.setHeader("Access-Control-Allow-Headers", "*");
        ex_res.send(ax_res.data);
      });
    }
  });
}

set_get("/albums/:id", ep_albumsex);
set_get("/albums2/:id", ep_albums);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});