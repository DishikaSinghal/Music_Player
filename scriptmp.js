document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const songItems = document.querySelectorAll('.song-item');
    const songImage = document.querySelector('.player img');
    const songTitle = document.querySelector('.current-song');
    const timer = document.getElementById('timer');
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-song');
    const prevButton = document.getElementById('prev-song');
    const homePage = document.getElementById('home-page');
    const musicPlayer = document.getElementById('music-player');
    const songDetails = document.getElementById('song-details');
    const proceedButton = document.getElementById('proceed-button');
    const backToListButton = document.getElementById('back-to-list');
    const detailSongImage = document.getElementById('detail-song-image');
    const detailSongTitle = document.getElementById('detail-song-title');
    const detailSongArtist = document.getElementById('detail-song-artist');
    const detailsButton = document.getElementById('details-button');


    let isPlaying = false;
    let currentSongIndex = 0;

    function playSong() {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
    }

    function pauseSong() {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    }

    function updateProgress() {
        const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        const currentTime = formatTime(audioPlayer.currentTime);
        const duration = formatTime(audioPlayer.duration);
        timer.textContent = `${currentTime} / ${duration}`;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    audioPlayer.addEventListener('timeupdate', updateProgress);

    audioPlayer.addEventListener('ended', () => {
        if (currentSongIndex < songItems.length - 1) {
            currentSongIndex++;
            playSelectedSong();
        }
    });

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;

        audioPlayer.currentTime = (clickX / width) * duration;
    });

    songItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            playSelectedSong();
        });
    });

    function playSelectedSong() {
        const selectedSong = songItems[currentSongIndex];
        const audioSrc = selectedSong.getAttribute('data-audio');
        const imageSrc = selectedSong.getAttribute('data-image');
        const title = selectedSong.querySelector('p').textContent;
        const duration = selectedSong.querySelector('.duration').textContent;

        audioPlayer.src = audioSrc;
        songImage.src = imageSrc;
        songTitle.textContent = title;
        timer.textContent = `0:00 / ${duration}`;
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        progress.style.width = '0%';
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    backButton.addEventListener('click', () => {
        audioPlayer.currentTime = 0;
        progress.style.width = '0%';
        pauseSong();
        musicPlayer.style.display = 'none';
        homePage.style.display = 'block';
    });

    nextButton.addEventListener('click', () => {
        if (currentSongIndex < songItems.length - 1) {
            currentSongIndex++;
            playSelectedSong();
            playSong();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            currentSongIndex--;
            playSelectedSong();
            playSong();
        }
    });

    proceedButton.addEventListener('click', () => {
        homePage.style.display = 'none';
        musicPlayer.style.display = 'block';
    });

    detailsButton.addEventListener('click', () => {
        songDetails.style.display = 'block';
        musicPlayer.style.display = 'none';
    });

    backToListButton.addEventListener('click', () => {
        songDetails.style.display = 'none';
        musicPlayer.style.display = 'block';
    });
});
