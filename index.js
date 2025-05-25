import { userToken } from './data/user.js';
import { templates, playlist_id, setPlayerTemplate } from './data/templates.js';

setButtonListeners();

function setButtonListeners() {
  document.getElementById('playlists-btn').addEventListener('click', setPlaylistsTemplate);
  document
    .getElementsByClassName('theme-btn')[0]
    .addEventListener('click', setPlaylistsTemplate); /* Temporary, change later */
}

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${userToken}`
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

function addTemplateToAnyWindow(target, template) {
  document.getElementsByClassName(target)[0].innerHTML = template;
}
function setPlaylistsTemplate() {
  const target = 'spotify-window';
  addTemplateToAnyWindow(target, templates.favorites);

  document.getElementById('electric-bogaloo-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.electric_bogaloo));
  });
  document.getElementById('angeh-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.angeh));
  });
  document.getElementById('retro-modern-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.retro_modern));
  });
  document.getElementById('top-tracks-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.my_top_tracks));
  });
  document.getElementById('chill-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.chill));
  });
  document.getElementById('80s-gym-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.gym_metal_vibe));
  });
  document.getElementById('chill-hiphop-list').addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlist_id.chill_hip_hop));
  });
}
