var songs=["Elektronomia - Sky High [NCS Release].mp3",
          "Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3",
           "TonyZ - Road So Far ( Inspired By Alan Walker) [NCN Release].mp3"];
var songTitle=document.getElementById('songTitle');
var songSlider=document.getElementById('songSlider');
var currentTime=document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider=document.getElementById('volumeSlider');
var nextSongTitle=document.getElementById('nextSongTitle');

var song=new Audio();
var currentSong=0;
window.onload=loadSong;

function loadSong(){
  song.src="songs/" + songs[currentSong];
  songTitle.textContent=(currentSong + 1) + ". " + songs[currentSong];
  nextSongTitle.innerHTML="<b>Next song: </b>" + songs[currentSong +1 % songs.length];
  song.volume=volumeSlider.value;
  song.play();
  song.playbackRate=1;
  setTimeout(showDuration, 1000);
}
setInterval(updateSongSlider,1000);

function updateSongSlider(){
  var c=Math.round(song.currentTime);
  songSlider.value=c;
  currentTime.textContent=convertTime(c);
  if(song.ended){
    next();
  }
}
function convertTime(secs){
  var min=Math.floor(secs/60);
  var sec=secs%60;
  min=(min<10) ? "0" + min : min;
  sec=(sec<10) ? "0" + sec : sec;
  return (min + ":" + sec);
}
function showDuration(){
  var d=Math.floor(song.duration);
  songSlider.setAttribute("max",d);
  duration.textContent=convertTime(d);
}
function playorPauseSong(x){
  song.playbackRate=1;
  if(song.paused){
    song.play();
    x.classList.add("fa-pause-circle");
    x.classList.remove("fa-play-circle");
    //$(this).find("i").removeClass("fa-play-circle").addClass("fa-pause-circle");
  }
  else{
    song.pause();
//  $(this).find("i").removeClass("fa-pause-circle").addClass("fa-play-circle");
x.classList.remove("fa-pause-circle");
x.classList.add("fa-play-circle");
  }
};

function next(){
  currentSong=currentSong + 1 % songs.length;
  loadSong();
}

function previous(){
  currentSong--;
  currentSong=(currentSong<0) ? songs.length-1 : currentSong;
  loadSong();
}
function seekSong(){
  song.currentTime=songSlider.value;
  currentTime.textContent=convertTime(song.currentTime);
}
function adjustVolume(){
  song.volume=volumeSlider.value;
}
function increasePlaybackRate(){
  song.playbackRate += 0.5;
}
function decreasePlaybackRate(){
  song.playbackRate -= 0.5;
}
function mute(){
  song.muted=true;
  volumeSlider.value=0;
}
function unmute(){
  song.muted=false;
  volumeSlider.value=1;
}
