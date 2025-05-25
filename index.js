import { userToken } from './data/user.js';
import { templates } from './data/templates.js';

setButtonListeners();

function setButtonListeners() {
  //   document.getElementById('playlists-btn').addEventListener('click', setPlaylistsTemplate());
  document.querySelectorAll('#playlists-btn').forEach((button) => {
    button.addEventListener('click', setPlaylistsTemplate);
  });
}

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
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

async function getPlaylist(playlistId) {
  let test = await fetchWebApi(`v1/playlists/${playlistId}`, 'GET').items;
  console.log(test);
}

function addTemplateToAnyWindow(target, template) {
  document.getElementsByClassName(target)[0].innerHTML = template;
}

function setPlaylistsTemplate() {
  console.log(templates.favorites);
  addTemplateToAnyWindow('spotify-window', templates.favorites);
}

function setPlayerTemplate(playlistId) {
  return `
        <iframe
            title="Spotify Embed: Recommendation Playlist"
            src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          >
        </iframe>    
    `;
}

function login() {
  var redirect_uri = 'http://127.0.0.1:5500/callback';

  var app = express();

  app.get('/login', function (req, res) {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: userToken.client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        })
    );
  });
}
