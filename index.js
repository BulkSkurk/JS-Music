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
  addTemplateToAnyWindow('spotify-window', templates.favorites);

  document.getElementById('electric-bogaloo-list').addEventListener('click', () => {
    addTemplateToAnyWindow('spotify-window', setPlayerTemplate(playlist_id.electric_bogaloo));
  });
}
