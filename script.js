let songIndex = 0
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("progressBar")
let gif = document.getElementById("gif")
let heartFav = Array.from(document.getElementsByClassName("heartFav"))
let audioElement = new Audio('assets/SONGjhukiNajar.mp3');
let card = Array.from(document.getElementsByClassName('card'))
let masterSongName = document.getElementById("masterSongName")

let songs = [
    { songName: 'Teri jhuki najar', filePath: 'songs/1.mp3', coverPath: 'assets/jhuki najar.jpeg', MovieName: 'Murder 3 . Album', duration: '4:39' },
    { songName: 'Hawa Banke', filePath: 'songs/2.mp3', coverPath: 'assets/Hawa-Banke.jpg', MovieName: 'Album', duration: '2:51' },
    { songName: 'Tere Hawale', filePath: 'songs/3.mp3', coverPath: 'assets/Tere-Hawaale.jpg', MovieName: 'Lal singh chaddha . Album', duration: '5:46' },
    { songName: 'Ishq wala Love', filePath: 'songs/4.mp3', coverPath: 'assets/IshqWalaLove.jpg', MovieName: 'Student of the year . Album', duration: '4:17' },
    { songName: 'yaar nahi milya', filePath: 'songs/5.mp3', coverPath: 'assets/yaar nahi milya.jpg', MovieName: 'Student of the year . Album', duration: '5:10' }
]

card.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
    element.getElementsByClassName('desc')[0].innerHTML = songs[i].MovieName
})

// favorites button functional
heartFav.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (e.target.classList.contains('fa-regular')) {
            e.target.classList.remove('fa-regular')
            e.target.classList.add('fa-solid')
        }
        else {
            e.target.classList.remove('fa-solid')
            e.target.classList.add('fa-regular')
        }
    })
})

const playSongCard = () => {
    let elem = document.getElementsByClassName('playSong')[songIndex]
    elem.classList.add('fa-circle-pause')
    elem.classList.remove('fa-circle-play')

}
const pauseSongCard = () => {
    let elem = document.getElementsByClassName('playSong')[songIndex]
    elem.classList.remove('fa-circle-pause')
    elem.classList.add('fa-circle-play')

}

// make play pause functional
masterPlay.addEventListener("click", () => {
    console.log("clicked");
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        // song index jis pr h wo wala bhi song card play ho jaye
        playSongCard()
        gif.style.opacity = 1
        Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
            if (element.classList.contains('fa-circle-pause')) {
                element.classList.remove('fa-circle-play')
                element.classList.add('fa-circle-pause')
            }
        })
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        // song index jis pr h wo wala bhi song card pause ho jaye
        pauseSongCard()
        gif.style.opacity = 0
        Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
            if (element.classList.contains('fa-circle-play')) {
                element.classList.remove('fa-circle-pause')
                element.classList.add('fa-circle-play')
            }
        })
    }
})

// listen to the events
audioElement.addEventListener("timeupdate", () => {
    // updating seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)       // percentage = (currentTime / Duration) * 100
    myProgressBar.value = progress
})

// updating seekbar
myProgressBar.addEventListener('change', () => {
    // currentTime = (percentage * Duration) / 100
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

// jis gaane pr click kre wo play ho
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
    element.addEventListener(('click'), (e) => {
        songIndex = parseInt(e.target.id)
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlay()       // sbko play button bna dena bcz ek gaana play ho rha h phir 2nd gaana bhi play ho rha hoga toh dono me pause ka symbol aayega so click krte hi sbse pahle sbko play bna do
            masterSongName.innerHTML = songs[songIndex].songName
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            masterPlay.classList.remove('fa-play')
            masterPlay.classList.add('fa-pause')
            gif.style.opacity = 1
        }
        else {
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            audioElement.pause()
            masterPlay.classList.remove('fa-pause')
            masterPlay.classList.add('fa-play')
            gif.style.opacity = 0
        }
    })
})

// next button functional
document.getElementById('next').addEventListener('click', () => {
    pauseSongCard()
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    playSongCard()
    masterSongName.innerHTML = songs[songIndex].songName
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    gif.style.opacity = 1
})

// previous button functional
document.getElementById('previous').addEventListener('click', () => {
    pauseSongCard()
    if (songIndex <= 0) {
        songIndex = songs.length - 1
    } else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    playSongCard()
    audioElement.play()
    masterSongName.innerHTML = songs[songIndex].songName
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    gif.style.opacity = 1
})

