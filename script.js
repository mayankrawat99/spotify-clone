let currentsong = new Audio()
defaultvolume()
let currentfolder;
let songs
function defaultvolume() {
  document.querySelector(".bar2").style.width = volume.value + "%"
  document.querySelector(".dot").style.left = volume.value + "%"
}

async function getsongsofplaylist(folder) {
  currentfolder = folder

  let a = await fetch(`${folder}`)
  let resp = await a.text();
  let elem = document.createElement("div")
  elem.innerHTML = resp
  let a_s = elem.getElementsByTagName("a")
  songs = []


  for (let index = 0; index < a_s.length; index++) {
    const element = a_s[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${folder}/`)[1].replaceAll("%20", " "))
    }
  }
  //display the list of songs
  let songul = document.querySelector(".songslist").getElementsByTagName("ul")[0];
  songul.innerHTML = ""
  for (const song of songs) {
    songul.innerHTML += ` <li class="flex"><div class="img"><img height="20px" src="svg/music.svg"></div>
    <div class="info"><div class="songsname">${song} </div> <div class="artist">Spotify-library</div></div> <div class="playnow"><img src="svg/play.svg" height="35px" alt=""></div></li>`
  }
  //eventlistener to each song
  Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", (element) => {
      playsong(e.querySelector(".info").firstElementChild.innerHTML)
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
    })
  });


  return songs

}
//convert seconds to minute for music duraton
let secondstominute = (t) => {
  if (t != "NaN:NaN") {
    let totalseconds = Math.floor(t)
    let minutes = Math.floor(totalseconds / 60)
    let seconds = totalseconds - minutes * 60
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return `${minutes}:${seconds}`
  }
  else {
    return "00:00"
  }
}
let playsong = (music, pause = false) => {
  currentsong.src = `${currentfolder}/` + music
  if (!pause) {
    play.src = "svg/pause.svg"
    currentsong.play()
  }
  document.querySelector(".songname").innerHTML = music
  currentsong.addEventListener('loadedmetadata', function () {
    document.querySelector(".endtime").innerHTML = secondstominute(currentsong.duration)
  });
  currentsong.addEventListener('ended', () => {
    let index = songs.indexOf(music);
    if (index < songs.length - 1) {
      playsong(songs[index + 1]);
    } else {
      // If it the last song, stop playing
      play.src = "svg/player.svg";
    }
  });
}
//seekbar  and volume bar working eventlistener

volume.addEventListener("change", () => {
  document.querySelector(".bar2").style.width = volume.value + "%"
  document.querySelector(".dot").style.left = volume.value + "%"
  currentsong.volume = volume.value / 100
 volume.value=  currentsong.volume
  if (currentsong.volume > 0) {
    soundicon.src = "svg/sound.svg"
  }


})
seekbar.addEventListener("change", () => {
  console.log(seekbar.value);
  document.querySelector(".bar").style.width = seekbar.value + "%"
  document.querySelector(".dotseek").style.left = seekbar.value + "%"
  currentsong.currentTime = (currentsong.duration * seekbar.value) / 100
})

//display albums
async function displayAlbums() {
  let a = await fetch(`/songs`)
  let resp = await a.text();

  let elem = document.createElement("div")
  elem.innerHTML = resp
  let a_s = elem.getElementsByTagName("a")
  for (let index = 0; index < a_s.length; index++) {
    const element = a_s[index];
    if (element.href.includes("/songs/")) {
      let folder = element.href.split("/")[4];
      let b = await fetch(`/songs/${folder}/info.json`)
      let response = await b.json()
      document.querySelector(".card-container").innerHTML += `<div class="card" data-folder="${folder} ">
      <img height=160 width=155 style="border-radius:4px ; margin-bottom: 4px;" src="/songs/${folder}/cover.jpg"
        alt="spotify">
      <div class="circle-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div class="content">
        <h3>${response.title}</h3>
        <p>${response.description} </p>
      </div>
    </div>`

    }
  }

  // Setup event listeners for album cards

  Array.from(document.getElementsByClassName("card")).forEach(card => {
    card.addEventListener("click", async () => {
      const folder = card.dataset.folder;
      await getsongsofplaylist(`/songs/${folder}`.trim());
      playsong(songs[0]);
    });
  });
}
//main function
async function main() {
  //get the list of all the songs 
  await getsongsofplaylist('/songs/Angry_(mood)')

  playsong(songs[0], true)
  await displayAlbums()
  
  //eventlistener to  play btn
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play()
      play.src = "svg/pause.svg"
    }
    else {
      currentsong.pause()
      play.src = "svg/player.svg"
    }
  })
  //eventlistener for timeupdate
  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".currenttime").innerHTML = secondstominute(currentsong.currentTime)
    document.querySelector(".bar").style.width = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    document.querySelector(".dotseek").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"

  })
  //add an eventlistener to previous and next btn
  previous.addEventListener("click", () => {
    console.log(currentsong.src);
    let index = songs.indexOf(currentsong.src.split(`${currentfolder}/`)[1].replaceAll("%20", " "))
    if (index > 0) {
      playsong(songs[index - 1])
    }
  })
  next.addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split(`${currentfolder}/`)[1].replaceAll("%20", " "))
    if (index < songs.length - 1) {
      playsong(songs[index + 1])
    }
  })
  //add event listener to sound icon
  soundicon.addEventListener("click", () => {

    if (soundicon.src.includes("sound.svg")) {
      soundicon.src = "svg/mute.svg"
      currentsong.volume = 0
      volume.value = 0
      defaultvolume()
    }
    else {
      soundicon.src = "svg/sound.svg"
      currentsong.volume = 30 / 100
      volume.value = 30
      defaultvolume()
    }
  })

  menu.addEventListener("click", () => {
    document.querySelector(".left").style.zIndex = "1111"
    document.querySelector(".left").style.left = "6px"
    document.querySelector("#close").style.display = "inline"
    document.querySelector(".right").style.filter = "blur(10px)";
  })
document.getElementById("close").addEventListener("click", () => {
    // document.querySelector(".left").style.zIndex = "1111"
    document.querySelector(".left").style.left = "-364px"
    document.querySelector("#close").style.display = "none"
    document.querySelector(".right").style.filter = "none";
  })
  // eventlistener for pause and play for svg change
  currentsong.addEventListener("pause",()=>{
   play.src ="svg/player.svg"
  })
  currentsong.addEventListener("play",()=>{
    play.src ="svg/pause.svg"
  })
}
main()


