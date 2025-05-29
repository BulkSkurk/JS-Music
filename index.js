import { userTokenInfo } from './data/user.js';
import {
  templates,
  playlist_id,
  setPlayerTemplate,
  album_id,
  endpoint_paths
} from './data/templates.js';

setButtonListeners();
const token = await getApiToken();

function setButtonListeners() {
  document.getElementById('playlists-btn').addEventListener('click', () => {
    addTemplateToPlaylistWindow('spotify-window', templates.favorites);
  });
  document.getElementById('top-albums-btn').addEventListener('click', () => {
    addTemplateToAlbumWindow('spotify-window', templates.favorite_albums);
  });
}

async function getApiToken() {
  const response = await fetchWebApiToken(endpoint_paths.token, 'POST', {
    grant_type: userTokenInfo.grant_type,
    client_id: userTokenInfo.client_id,
    client_secret: userTokenInfo.client_secret
  });
  return response.access_token;
}

async function fetchWebApi(endpoint, method) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method
  });
  return await res.json();
}
async function fetchWebApiToken(endpoint, method, body) {
  const res = await fetch(`https://accounts.spotify.com/${endpoint}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method,
    body: new URLSearchParams(body).toString()
  });
  return await res.json();
}

function addTemplateToPlaylistWindow(target, template) {
  document.getElementsByClassName(target)[0].innerHTML = template;

  attachPlaylistEventListeners(target);
}
function addTemplateToAlbumWindow(target, template) {
  document.getElementsByClassName(target)[0].innerHTML = template;

  attachAlbumEventListeners(target);
}
function attachAlbumEventListeners(target) {
  setAlbumConentsById('the-black-parade', target, album_id.black_parade);
  setAlbumConentsById('nija', target, album_id.nija);
  setAlbumConentsById('skeleta', target, album_id.skeleta);
  setAlbumConentsById('a-garbage-pail-kid', target, album_id.garbage_pail_kid);
  setAlbumConentsById('lateralus', target, album_id.lateralus);
  setAlbumConentsById('chkdsk', target, album_id.chkdsk);
}
function attachPlaylistEventListeners(target) {
  setIframeConentsById('electric-bogaloo-list', target, playlist_id.electric_bogaloo);
  setIframeConentsById('angeh-list', target, playlist_id.angeh);
  setIframeConentsById('retro-modern-list', target, playlist_id.retro_modern);
  setIframeConentsById('top-tracks-list', target, playlist_id.my_top_tracks);
  setIframeConentsById('chill-list', target, playlist_id.chill);
  setIframeConentsById('80s-gym-list', target, playlist_id.gym_metal_vibe);
  setIframeConentsById('chill-hiphop-list', target, playlist_id.chill_hip_hop);
}

function setIframeConentsById(elementId, target, playlistId) {
  document.getElementById(elementId).addEventListener('click', () => {
    addTemplateToPlaylistWindow(target, setPlayerTemplate(playlistId));
  });
}
function setAlbumConentsById(elementId, target, albumId) {
  document.getElementById(elementId).addEventListener('click', () => {
    setAlbumTemplate(albumId).then((template) => {
      addTemplateToAlbumWindow(target, template);
    });
  });
}
async function setAlbumTemplate(albumId) {
  const response = await fetchWebApi(endpoint_paths.albums + albumId, 'GET');
  console.log(response);

  let songs = [];

  for (let song of response.tracks.items) {
    songs.push('<p>' + song.name.replace('.', '') + '</p>');
  }

  return `
        <div class="playlist-navbar">
        <p>Choose an album</p>
        <a href=# id="the-black-parade">The black parade</a>
        <p>My Chemical Romance</p>
        <a href=# id="nija">Nija</a>
        <p>Orbit Culture</p>
        <a href=# id="skeleta">Skeleta</a>
        <p>Ghost</p>
        <a href=# id="a-garbage-pail-kid">A Garbage Pail Kid</a>
        <p>Prop Dylan</p>
        <a href=# id="lateralus">Lateralus</a>
        <p>Tool</p>
        <a href=# id="chkdsk">CHKDSK</a>
        <p>MASTER BOOT RECORD</p>
    </div>
    <div class="album-info">
      <img src="${response.images[0].url}" id="album-cover" />
        <div class ="artist-info">
          <h2>${response.name}</h2>
          <p>Artist: ${response.artists[0].name}</p>
          <p>Label: ${response.label}</p>
          <p>Release Date: ${response.release_date}</p>
          <p>No.Tracks: ${response.total_tracks}</p>
          <p>Listen on spotify:<a href=${
            response.external_urls.spotify
          }><img src="./img/Spotify_logo.webp" id="spotify-logo"></a></p>
        </div>
      <div class ="songs-list">
        <p>Songs</p>
        ${songs.join('')}
      </div>
    </div>
    <div>
            <iframe
            title="Spotify Embed: Recommendation Playlist"
            src="https://open.spotify.com/embed/album/${response.id}?utm_source=generator"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>      
        </div>
    `;
}
