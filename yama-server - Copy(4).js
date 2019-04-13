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
//app.put("/yama/playlist/:name/:description", editPlaylist); // web-api
//app.get("/yama/playlists", getPlaylists); // web-api
//app.get("/yama/playlists/:id",getPlaylistInfo);
//app.put("/yama/playlists/:id/:musicId",addMusicToPlaylist);
//app.delete("/yama/playlists/:id/:musicId",deleteMusicFromPlaylist);


//localhost:3000/api/artists/tony+carreira
///api/albums/5ae3ee8e-2bfd-4ffe-8551-e571f25f24a2
///api/albums/dddf01df-f9f1-4ba6-b414-5ddf1984fc7f/tracks
// YAMA WEB API START//

const es = {
  host: "localhost",
  port: "9200",
  yama_index: "yama",
  yama_api: "http://ws.audioscrobbler.com/2.0/",
  Api_token: "f72aedc9562cd94f698840409f292395" // might create another object or delete this
};

function getArtistsByName(req, resp) {
  // const uri = `${es.yama_api}?method=artist.search&artist=${name}&api_key=${es.Api_token}&format=json`
  getInfo("artist.search", `artist=${req.params.name}`, body =>
    body.results.artistmatches.artist.forEach(element => {
      console.log(`${element.name} mbid = ${element.mbid}`);
    })
  );
}
function getAlbumsByMbid(req, resp) {
  //http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=5ae3ee8e-2bfd-4ffe-8551-e571f25f24a2&api_key=f72aedc9562cd94f698840409f292395&format=json
  getInfo("artist.getTopAlbums", `mbid=${req.params.mbid}`, body =>
    body.topalbums.album.forEach(element => {
      console.log(`${element.name} \t mbid = ${element.mbid}`);
    })
  );
}

function getTracksByMbid(req, resp) {
  //http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json===>?
  getInfo("album.getinfo", `mbid=${req.params.mbid}`, body => {
    console.log(`Album : ${body.album.name}\n`);
    body.album.tracks.track.forEach(element => console.log(`${element.name}`));
  });
}

function getInfo(method, searchParams, bodyFunc) {
  const uri = `${es.yama_api}?method=${method}&${searchParams}&api_key=${
    es.Api_token
    }&format=json`;
  console.log(uri);
  request.get(uri, (err, res, body) => {
    body = JSON.parse(body);
    bodyFunc(body);
  });
}
// YAMA WEB API END//

function reportError(statusOk, err, res, body, cb) {
  if (err) {
    
    return cb(err);
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
