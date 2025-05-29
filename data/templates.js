export const templates = {
  favorites: `
    <div class="playlist-navbar">
        <p>Choose a Playlist</p>
        <a href=# id="electric-bogaloo-list">Electric Bogaloo</a>
        <a href=# id="angeh-list">Angeh</a>
        <a href=# id="retro-modern-list">Retro-Modern</a>
        <a href=# id="top-tracks-list">Top-Tracks</a>
        <a href=# id="chill-list">Chill</a>
        <a href=# id="80s-gym-list">80's Gym Metal Vibe</a>
        <a href=# id="chill-hiphop-list">Chill HipHop</a>
    </div>
    `,
  favorite_albums: `
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
    `
};
export const playlist_id = {
  electric_bogaloo: '5IKrzhvvStUh1SSdPzvyU2',
  angeh: '60QEncV0rXXOb5AUABLWc7',
  retro_modern: '0iGRxBeJ2ztYWNSJUskZcw',
  my_top_tracks: '7Awq3e5oghi3Uc1hAVBHzg',
  chill: '6euZIVXPYHKuRY1gz4Klka',
  gym_metal_vibe: '0sKXadCXx9CJjki3WwDHJR',
  chill_hip_hop: '7hVc5hIzqHP5yg165t58VQ'
};

export const album_id = {
  black_parade: '0FZK97MXMm5mUQ8mtudjuK',
  nija: '7ebnxkx8HZNvtTB3me1S9C',
  skeleta: '37a1ehu3HGYPA07QFvWIsL',
  garbage_pail_kid: '2tczZ8ZZKYwSfKUaew8Bse',
  lateralus: '5l5m1hnH4punS1GQXgEi3T',
  chkdsk: '1ymuJCekHsFQpPFHw9nsy3'
};

export const endpoint_paths = {
  albums: 'v1/albums/',
  token: 'api/token'
};

export function setPlayerTemplate(playlistID) {
  return `
        <div class="playlist-navbar">
          <p>Choose a Playlist</p>
          <a href=# id="electric-bogaloo-list">Electric Bogaloo</a>
          <a href=# id="angeh-list">Angeh</a>
          <a href=# id="retro-modern-list">Retro-Modern</a>
          <a href=# id="top-tracks-list">Top-Tracks</a>
          <a href=# id="chill-list">Chill</a>
          <a href=# id="80s-gym-list">80's Gym Metal Vibe</a>
          <a href=# id="chill-hiphop-list">Chill HipHop</a>
        </div>
        <iframe
            title="Spotify Embed: Recommendation Playlist"
            src="https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          >
        </iframe>    
    `;
}
