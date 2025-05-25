const musicData = [
    {
        id: 1,
        title: "Khoshhalam Barat",
        artist: "Shadmehr Aghili",
        cover: "img/1.webp",
        audio: "music/Shadmehr-Aghili-Khoshhalam-Barat.mp3"
    },
    {
        id: 2,
        title: "Tasvir",
        artist: "Shadmehr Aghili",
        cover: "img/2.jpg",
        audio: "music/Shadmehr-Aghili-Tasvir.mp3"
    },
    {
        id: 3,
        title: "Harighe Sabz",
        artist: "Ebi",
        cover: "img/3.webp",
        audio: "music/ebi_harighe_sabz.mp3"
    },
    {
        id: 4,
        title: "Noono Paniro Sabzi",
        artist: "Ebi & Dariush",
        cover: "img/4.jpg",
        audio: "music/dariush_ebi_-_noon_o_panir_o_sabzi.mp3"
    },
    {
        id: 5,
        title: "Man Bayad Miraftam",
        artist: "Mohsen Chavoshi",
        cover: "img/5.jpg",
        audio: "music/Mohsen-Chavoshi-Man-Bayad-Miraftam.mp3"
    },
    {
        id: 6,
        title: "Ba To Inam",
        artist: "Hamim",
        cover: "img/6.jpg",
        audio: "music/Haamim-Ba-To-Inam.mp3"
    },
    {
        id: 7,
        title: "Taghvime Mochaleh",
        artist: "Mohsen Yegane",
        cover: "img/7.jpg",
        audio: "music/Mohsen-Yeganeh-Taghvime-Mochaleh.mp3"
    },
    {
        id: 8,
        title: "Bad Az To",
        artist: "Mohsen Chavoshi",
        cover: "img/8.jpg",
        audio: "music/Mohsen-Chavoshi-Bad-Az-To.mp3"
    },

    {
        id: 9,
        title: "To Khoob",
        artist: "Mohsen Yegane",
        cover: "img/9.jpg",
        audio: "music/Mohsen-Yeganeh-To-Khoob.mp3"
    },
    {
        id: 10,
        title: "Ghalbe Mani",
        artist: "Hamim",
        cover: "img/10.jpg",
        audio: "music/Haamim-Ghalbe-Mani.mp3"
    },
    {
        id: 11,
        title: "Hezaro Yek Shab",
        artist: "Erfan Tahmasbi",
        cover: "img/11.jpg",
        audio: "music/Erfan-Tahmasbi-Hezaro-Yek-Shab.mp3"
    },
    {
        id: 12,
        title: "Delgir",
        artist: "Erfan Tahmasbi",
        cover: "img/12.jpg",
        audio: "music/Erfan-Tahmasbi-Delgir.mp3"
    },
]



let currentSong = null;
let isPlaying = false;
let audio = new Audio();
let currentTime = 0;
let duration = 0;


document.addEventListener('DOMContentLoaded', function () {

    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('#line');
    const progress = document.querySelector('#fill');
    const progressBtn = document.querySelector('#Fbtn');
    const volumeSlider = document.getElementById('volume');
    const volumeProgress = document.getElementById('volume-fill');
    const volumeBtn = document.getElementById('volume-btn');
    const nowPlayingImg = document.querySelector('.now-playing>img');
    const nowPlayingTitle = document.querySelector('.now-playing h4');
    const nowPlayingArtist = document.querySelector('.now-playing p');
    const currentTimeSpan = document.getElementById('Tpast');
    const leftTimeSpan = document.getElementById('Tleft');
    const musicGrid = document.getElementById('music-grid');

    /////////////////////////////


    function initializeMusicGrid() {
        console.log('در حال راه‌اندازی شبکه موسیقی...');
        musicGrid.innerHTML = '';

        musicData.forEach(song => {
            const card = createMusicCard(song);
            musicGrid.appendChild(card);
        });
    }

    function createMusicCard(song) {
        const card = document.createElement('div');
        card.className = 'music-card w-[240px] h-[310px] shadow  shadow-neutral-600 hover:shadow-neutral-300 hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ';
        card.innerHTML = `
           <div class="w-full h-full">
            <figure class=" w-full h-[240px] flex items-center justify-center overflow-hidden">
                <img src="${song.cover}" alt="${song.title}" class="w-full h-full object-contain ronded-[20px]" >
            </figure>
            <div class="p-3 w-full flex flex-wrap h-1/3 text-left font-arial mb-1">
                <h4 class="w-[85%] text-neutral-100">${song.title}</h4>
                <span class="icon-note text-white"></span>
                <p class="w-full flex text-sm text-neutral-400 -mt-4 ">${song.artist}</p>
            </div>
           </div>
        `;
        card.addEventListener('click', () => playSong(song));
        return card;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function playSong(song) {
        try {
            console.log(`تلاش برای پخش: ${song.title}`);
            currentSong = song;
            audio.src = song.audio;

            audio.onerror = function () {
                console.log(`خطا در بارگذاری فایل صوتی: ${song.audio}`);
            };

            audio.onloadstart = function () {
                console.log(`در حال بارگذاری فایل صوتی: ${song.audio}`);
            };

            audio.oncanplay = function () {
                console.log(`فایل صوتی با موفقیت بارگذاری شد: ${song.audio}`);
                audio.play().catch(error => {
                    console.log(`خطا در پخش صدا: ${error.message}`);
                });
            };

            isPlaying = true;
            updatePlayerUI();
        } catch (error) {
            console.log(`خطا در تابع playSong: ${error.message}`);

        }
    }

    function updatePlayerUI() {
        if (currentSong) {
            nowPlayingImg.src = currentSong.cover;
            nowPlayingTitle.textContent = currentSong.title;
            nowPlayingArtist.textContent = currentSong.artist;
            const playIcon = playBtn.querySelector('i');
            if (playIcon) {
                playIcon.classList.remove('icon-play', 'icon-pause');
                playIcon.classList.add(isPlaying ? 'icon-pause' : 'icon-play');
            }
        }
    }

    function togglePlay() {
        if (!currentSong) {
            if (musicData.length > 0) {
                playSong(musicData[0]);
            }
            return;
        }

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        updatePlayerUI();
    }


    function updateProgress() {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            progressBtn.style.left = `${progressPercent}%`;
            currentTimeSpan.textContent = formatTime(audio.currentTime);
            leftTimeSpan.innerText = "- " + formatTime(audio.duration - audio.currentTime)
        }
    }

    function setProgress(e) {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function setVolume(e) {
        const width = volumeSlider.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        audio.volume = Math.max(0, Math.min(1, volume));
        volumeProgress.style.width = `${volume * 100}%`;
        volumeBtn.style.left = `${volume * 100}%`;
    }

    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => {
        const currentIndex = musicData.findIndex(song => song.id === currentSong?.id);
        if (currentIndex > 0) {
            playSong(musicData[currentIndex - 1]);
        }
    });
    nextBtn.addEventListener('click', () => {
        const currentIndex = musicData.findIndex(song => song.id === currentSong?.id);
        if (currentIndex < musicData.length - 1) {
            playSong(musicData[currentIndex + 1]);
        }
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        const currentIndex = musicData.findIndex(song => song.id === currentSong?.id);
        if (currentIndex < musicData.length - 1) {
            playSong(musicData[currentIndex + 1]);
        } else {
            isPlaying = false;
            updatePlayerUI();
        }
    });

    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('click', setVolume);


    initializeMusicGrid();

    audio.onplay = () => {
        isPlaying = true;
        updatePlayerUI();
    };

    audio.onpause = () => {
        isPlaying = false;
        updatePlayerUI();
    };
});

///////////////////////////////////////////////////////////////////////

