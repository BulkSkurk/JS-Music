import { userToken } from './data/user.js';
import { templates, playlist_id, setPlayerTemplate } from './data/templates.js';

setButtonListeners();

function setButtonListeners() {
  document.getElementById('playlists-btn').addEventListener('click', () => {
    addTemplateToAnyWindow('spotify-window', templates.favorites);
  });
  document.getElementsByClassName('theme-btn')[0].addEventListener('click', () => {
    addTemplateToAnyWindow('spotify-window', templates.favorites);
  }); /* Temporary, change later */
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

  attachPlaylistEventListeners(target);
}
function attachPlaylistEventListeners(target) {
  setConentsById('electric-bogaloo-list', target, playlist_id.electric_bogaloo);
  setConentsById('angeh-list', target, playlist_id.angeh);
  setConentsById('retro-modern-list', target, playlist_id.retro_modern);
  setConentsById('top-tracks-list', target, playlist_id.my_top_tracks);
  setConentsById('chill-list', target, playlist_id.chill);
  setConentsById('80s-gym-list', target, playlist_id.gym_metal_vibe);
  setConentsById('chill-hiphop-list', target, playlist_id.chill_hip_hop);
}

function setConentsById(elementId, target, playlistId) {
  document.getElementById(elementId).addEventListener('click', () => {
    addTemplateToAnyWindow(target, setPlayerTemplate(playlistId));
  });
}
