"use strict";

const http = require("http");
const express = require("express");
const request = require("request"); //a tirar para por no yamaData
const app = express();
let API_KEY = "f72aedc9562cd94f698840409f292395";
//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=freddy+mercury&api_key=f72aedc9562cd94f698840409f292395&format=json
//localhost:3000/api/artist/tony+carreira

app.get("/api/artists/:name", getArtistsByName); // web-api
app.get("/api/albums/:mbid", getAlbumsByMbid); // web-api
app.get("/api/albums/:mbid/tracks", getTracksByMbid); // web-api
app.put("/yama/playlist/:name/:description", editPlaylist); // web-api
app.get("/yama/playlists", getPlaylists); // web-api

//localhost:3000/api/artist/tony+carreira

// YAMA WEB API START//

const es = {
  host: "localhost",
  port: "9200",
  yama_index: "yama",
  yama_api: "http://ws.audioscrobbler.com/2.0/",
  Api_token: "f72aedc9562cd94f698840409f292395" // might create another object or delete this
};

function getArtistsByName(req, resp) {
  // let name = req.params.name
  // const uri = `${es.yama_api}?method=artist.search&artist=${name}&api_key=${es.Api_token}&format=json`  // necessita criar variável com url do site em vez de hardcoded
  //     request.get(uri, (err, res, body) =>{
  // 		body = JSON.parse(body)
  // 		console.log(body)
  //     })
  getInfo("artist.search", `artist=${req.params.name}`);
}
function getAlbumsByMbid(req, resp) {
  // //http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=5ae3ee8e-2bfd-4ffe-8551-e571f25f24a2&api_key=f72aedc9562cd94f698840409f292395&format=json
  // let mbid = req.params.mbid
  // const uri = `${es.yama_api}?method=artist.gettopalbums&mbid=${mbid}&api_key=${es.Api_token}&format=json`
  //     request.get(uri, (err, res, body) =>{
  // 		body = JSON.parse(body)
  // 		console.log(body.topalbums.album[0])
  //     })
  getInfo("artist.gettopalmbuns", `mbid = ${req.params.mbid}`);
}

function getTracksByMbid(req, resp) {
  //http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json
  let mbid = req.params.mbid;
  getInfo(
    "artist.search",
    `artist=${req.params.name}&album=${req.params.album /*?????*/}`
  );
}

function getInfo(method, searchParams) {
  const uri = `${es.yama_api}?method=${method}&${searchParams}&api_key=${
    es.Api_token
  }&format=json`;
  request.get(uri, (err, res, body) => {
    body = JSON.parse(body);
    console.log(body);
    /*Em vez de Console.Log o metodo getInfo pode receber uma função que sabe tratar do body */
  });
}
// YAMA WEB API END//

function reportError(statusOk, err, res, body, cb) {
  if (err) {
    cb(err);
    return true;
  }
  if (res.statusCode != statusOk) {
    cb({
      code: res.statusCode,
      message: res.statusMessage,
      error: body
    });
    return true;
  }
}
/*
app.listen(3000, () => console.log('HTTP Server running on port 3000'))
*/
http
  .createServer(app)
  .listen(3000, () => console.log("HTTP Server running on port 3000"));
