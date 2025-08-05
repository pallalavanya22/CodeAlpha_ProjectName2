const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const durationTime = document.getElementById('duration');
const volume = document.getElementById('volume');
const songListEl = document.getElementById('song-list');

let songs = [
  { name: 'song1.mp3', title: 'Jalsa Title Song', artist: 'DSP-Jalsa' },
  { name: 'song2.mp3', title: 'Aaduvari Matalaku', artist: 'Mani Sharma - Kushi' },
  { name: 'song3.mp3', title: 'Travelling Soldier', artist: 'Ramana Gokula - Thammudu' }
];

let songIndex = 0;
let isPlaying = false;

// Load song details
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `songs/${song.name}`;
}

// Play/Pause toggle
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerText = '⏸';
}
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerText = '▶️';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  songListEl.appendChild(li);
});

// Autoplay next song
audio.addEventListener('ended', () => {
  nextBtn.click(); // Move to next song
});

// Format time as M:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initial load
loadSong(songs[songIndex]);
