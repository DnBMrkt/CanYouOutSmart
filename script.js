/* =========================================================
   OUTSMART GAME
   VERSI BAHASA INDONESIA + SOUND EFFECT
========================================================= */


/* =========================================================
   SOUND
========================================================= */

const sounds = {
    click: new Audio("sound/click.mp3"),
    correct: new Audio("sound/correct.mp3"),
    wrong: new Audio("sound/wrong.mp3"),
    start: new Audio("sound/start.mp3"),
    finish: new Audio("sound/finish.mp3")
};


/* Supaya suara tidak menunggu terlalu lama */

Object.values(sounds).forEach(sound => {
    sound.preload = "auto";
});


function playSound(name) {

    if (!sounds[name]) return;

    try {

        sounds[name].currentTime = 0;

        const playPromise =
            sounds[name].play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {
                // Browser dapat memblokir audio.
                // Game tetap berjalan.
            });

        }

    } catch (error) {

        console.log(
            "Audio tidak dapat dimainkan:",
            error
        );

    }
}


/* =========================================================
   DATA SOAL
========================================================= */

const challenges = [

    {
        type: "🔢 POLA ANGKA",
        icon: "🔢",

        question:
            "Angka berapakah yang seharusnya melanjutkan pola berikut?",

        visual:
            "2　4　8　16　?",

        options: [
            "20",
            "24",
            "32",
            "36"
        ],

        answer: "32",

        category: "logic"
    },


    {
        type: "🧩 LOGIKA",

        icon: "🧩",

        question:
            "Manakah yang tidak termasuk kelompok yang sama?",

        visual:
            "🍎　🍌　🍊　🚗",

        options: [
            "🍎 Apel",
            "🍌 Pisang",
            "🍊 Jeruk",
            "🚗 Mobil"
        ],

        answer:
            "🚗 Mobil",

        category:
            "logic"
    },


    {
        type: "👀 PENGAMATAN",

        icon: "👀",

        question:
            "Manakah simbol yang berbeda dari yang lainnya?",

        visual:
            "◆　◆　◆　◇　◆　◆",

        options: [
            "Pertama",
            "Kedua",
            "Keempat",
            "Keenam"
        ],

        answer:
            "Keempat",

        category:
            "observation"
    },


    {
        type: "🧠 INGATAN",

        icon: "🧠",

        question:
            "Perhatikan benda-benda berikut. Benda mana yang muncul?",

        visual:
            "🐱　🍎　🚗　⭐　🐟",

        options: [
            "🐶 Anjing",
            "🐱 Kucing",
            "🐰 Kelinci",
            "🦁 Singa"
        ],

        answer:
            "🐱 Kucing",

        category:
            "memory"
    },


    {
        type: "⚡ KECEPATAN",

        icon: "⚡",

        question:
            "Manakah angka yang paling besar?",

        visual:
            "17　91　43　28",

        options: [
            "17",
            "91",
            "43",
            "28"
        ],

        answer:
            "91",

        category:
            "reaction"
    },


    {
        type: "🪤 JEBAKAN LOGIKA",

        icon: "🪤",

        question:
            "Kamu sedang mengikuti perlombaan. Kamu berhasil menyalip orang yang berada di posisi kedua. Sekarang kamu berada di posisi berapa?",

        visual:
            "🏃　🏃　🏃",

        options: [
            "Pertama",
            "Kedua",
            "Ketiga",
            "Keempat"
        ],

        answer:
            "Kedua",

        category:
            "logic"
    },


    {
        type: "🔐 PEMECAH KODE",

        icon: "🔐",

        question:
            "Jika A = 1, B = 2, C = 3, dan D = 4, berapakah C + D?",

        visual:
            "A = 1　B = 2　C = 3　D = 4",

        options: [
            "5",
            "6",
            "7",
            "8"
        ],

        answer:
            "7",

        category:
            "logic"
    },


    {
        type: "🔄 BERPIKIR TERBALIK",

        icon: "🔄",

        question:
            "Kata apa yang menjadi lebih pendek jika ditambahkan dua huruf?",

        visual:
            "Pikirkan baik-baik... 🤔",

        options: [
            "Panjang",
            "Pendek",
            "Kecil",
            "Tinggi"
        ],

        answer:
            "Pendek",

        category:
            "logic"
    },


    {
        type: "👁️ PENGAMATAN",

        icon: "👁️",

        question:
            "Ada berapa segitiga yang terlihat?",

        visual:
            "△　△　△　△",

        options: [
            "2",
            "3",
            "4",
            "5"
        ],

        answer:
            "4",

        category:
            "observation"
    },


    {
        type: "👑 TANTANGAN TERAKHIR",

        icon: "👑",

        question:
            "Angka berapakah yang melanjutkan pola berikut?",

        visual:
            "1　1　2　3　5　8　?",

        options: [
            "10",
            "11",
            "12",
            "13"
        ],

        answer:
            "13",

        category:
            "logic"
    }

];


/* =========================================================
   VARIABEL GAME
========================================================= */

let currentLevel = 0;

let score = 0;

let lives = 3;

let combo = 0;

let timeLeft = 20;

let timerInterval = null;

let answering = false;

let currentChallenge = null;


/* Statistik */

let categoryStats = {

    logic: {
        correct: 0,
        total: 0
    },

    memory: {
        correct: 0,
        total: 0
    },

    reaction: {
        correct: 0,
        total: 0
    },

    observation: {
        correct: 0,
        total: 0
    }

};


/* =========================================================
   AMBIL ELEMENT HTML
========================================================= */

const homeScreen =
    document.getElementById("homeScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");


const startBtn =
    document.getElementById("startBtn");

const retryBtn =
    document.getElementById("retryBtn");

const retryGameOver =
    document.getElementById("retryGameOver");

const homeBtn =
    document.getElementById("homeBtn");

const homeGameOver =
    document.getElementById("homeGameOver");

const shareBtn =
    document.getElementById("shareBtn");

const themeBtn =
    document.getElementById("themeBtn");


const levelNumber =
    document.getElementById("levelNumber");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const comboElement =
    document.getElementById("combo");

const timerElement =
    document.getElementById("timer");


const questionIcon =
    document.getElementById("questionIcon");

const questionText =
    document.getElementById("questionText");

const challengeType =
    document.getElementById("challengeType");

const challengeArea =
    document.getElementById("challengeArea");

const optionsContainer =
    document.getElementById("options");

const feedback =
    document.getElementById("feedback");


const xpPopup =
    document.getElementById("xpPopup");


const finalScore =
    document.getElementById("finalScore");

const gameOverScore =
    document.getElementById("gameOverScore");

const rankElement =
    document.getElementById("rank");

const brainType =
    document.getElementById("brainType");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const resultQuote =
    document.getElementById("resultQuote");


const logicScore =
    document.getElementById("logicScore");

const memoryScore =
    document.getElementById("memoryScore");

const reactionScore =
    document.getElementById("reactionScore");

const observationScore =
    document.getElementById("observationScore");


const logicBar =
    document.getElementById("logicBar");

const memoryBar =
    document.getElementById("memoryBar");

const reactionBar =
    document.getElementById("reactionBar");

const observationBar =
    document.getElementById("observationBar");


const bestScore =
    document.getElementById("bestScore");

const bestScoreHome =
    document.getElementById("bestScoreHome");

const achievementList =
    document.getElementById("achievementList");

const shareStatus =
    document.getElementById("shareStatus");


/* =========================================================
   ACAK SOAL / JAWABAN
========================================================= */

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


/* =========================================================
   PINDAH SCREEN
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    if (screen) {

        screen.classList.add(
            "active"
        );

    }

}


/* =========================================================
   RESET GAME
========================================================= */

function resetGame() {

    currentLevel = 0;

    score = 0;

    lives = 3;

    combo = 0;

    timeLeft = 20;

    answering = false;


    clearInterval(
        timerInterval
    );


    categoryStats = {

        logic: {
            correct: 0,
            total: 0
        },

        memory: {
            correct: 0,
            total: 0
        },

        reaction: {
            correct: 0,
            total: 0
        },

        observation: {
            correct: 0,
            total: 0
        }

    };


    updateScore();

    updateLives();

    updateCombo();

}


/* =========================================================
   MULAI GAME
========================================================= */

function startGame() {

    /*
       Suara start dipanggil
       setelah user menekan tombol.
    */

    playSound("click");

    setTimeout(() => {

        playSound("start");

    }, 100);


    resetGame();

    showScreen(gameScreen);

    loadChallenge();

}


/* =========================================================
   MEMUAT SOAL
========================================================= */

function loadChallenge() {

    clearInterval(
        timerInterval
    );


    answering = false;


    feedback.textContent =
        "";


    currentChallenge =
        challenges[currentLevel];


    levelNumber.textContent =
        `${currentLevel + 1}`;


    challengeType.textContent =
        currentChallenge.type;


    questionIcon.textContent =
        currentChallenge.icon;


    questionText.textContent =
        currentChallenge.question;


    challengeArea.innerHTML = `

        <div
            class="challenge-visual"
            style="
                font-size:28px;
                font-weight:900;
                text-align:center;
                padding:10px;
            "
        >
            ${currentChallenge.visual}
        </div>

    `;


    createOptions();


    updateProgress();


    startTimer();

}


/* =========================================================
   BUAT PILIHAN JAWABAN
========================================================= */

function createOptions() {

    optionsContainer.innerHTML =
        "";


    const shuffledOptions =
        shuffle(
            currentChallenge.options
        );


    shuffledOptions.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.type =
                "button";


            button.dataset.answer =
                option;


            button.innerHTML = `

                <span
                    style="
                        margin-right:10px;
                        opacity:.5;
                        font-size:11px;
                        font-weight:900;
                    "
                >
                    ${String.fromCharCode(
                        65 + index
                    )}
                </span>

                ${option}

            `;


            button.addEventListener(
                "click",
                () => {

                    playSound(
                        "click"
                    );


                    checkAnswer(
                        option,
                        button
                    );

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    clearInterval(
        timerInterval
    );


    timeLeft =
        currentLevel === 9
            ? 30
            : 20;


    updateTimer();


    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (
                timeLeft <= 0
            ) {

                clearInterval(
                    timerInterval
                );

                timeUp();

            }

        }, 1000);

}


/* =========================================================
   UPDATE TIMER
========================================================= */

function updateTimer() {

    timerElement.textContent =
        timeLeft;


    if (
        timeLeft <= 5
    ) {

        timerElement.style.color =
            "var(--red)";

    } else {

        timerElement.style.color =
            "var(--blue)";

    }

}


/* =========================================================
   WAKTU HABIS
========================================================= */

function timeUp() {

    if (answering) return;


    answering = true;


    clearInterval(
        timerInterval
    );


    combo = 0;


    updateCombo();


    playSound(
        "wrong"
    );


    loseLife();


    feedback.textContent =
        "⏰ WAKTU HABIS!";


    feedback.style.color =
        "var(--red)";


    highlightCorrectAnswer();


    disableOptions();


    setTimeout(() => {

        if (lives <= 0) {

            endGame();

        } else {

            nextLevel();

        }

    }, 1200);

}


/* =========================================================
   CEK JAWABAN
========================================================= */

function checkAnswer(
    selectedAnswer,
    selectedButton
) {

    if (answering) return;


    answering = true;


    clearInterval(
        timerInterval
    );


    const isCorrect =
        selectedAnswer ===
        currentChallenge.answer;


    categoryStats[
        currentChallenge.category
    ].total++;


    if (isCorrect) {

        /* =========================
           BENAR
        ========================= */

        categoryStats[
            currentChallenge.category
        ].correct++;


        selectedButton.classList.add(
            "correct"
        );


        playSound(
            "correct"
        );


        combo++;


        const baseXP =
            100;


        const comboBonus =
            combo * 10;


        const timeBonus =
            Math.max(
                0,
                timeLeft * 2
            );


        const earnedXP =
            baseXP +
            comboBonus +
            timeBonus;


        score +=
            earnedXP;


        feedback.textContent =
            `🎉 BENAR! +${earnedXP} XP`;


        feedback.style.color =
            "var(--green)";


        showXPPopup(
            `+${earnedXP} XP`
        );


        updateScore();

        updateCombo();

    } else {

        /* =========================
           SALAH
        ========================= */

        selectedButton.classList.add(
            "wrong"
        );


        playSound(
            "wrong"
        );


        combo = 0;


        updateCombo();


        feedback.textContent =
            `❌ SALAH! Jawaban yang benar: ${currentChallenge.answer}`;


        feedback.style.color =
            "var(--red)";


        loseLife();


        highlightCorrectAnswer();

    }


    disableOptions();


    setTimeout(() => {

        if (lives <= 0) {

            endGame();

        } else {

            nextLevel();

        }

    }, 1300);

}


/* =========================================================
   TAMPILKAN JAWABAN BENAR
========================================================= */

function highlightCorrectAnswer() {

    document
        .querySelectorAll(".option")
        .forEach(button => {

            if (
                button.dataset.answer ===
                currentChallenge.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        });

}


/* =========================================================
   MATIKAN PILIHAN
========================================================= */

function disableOptions() {

    document
        .querySelectorAll(".option")
        .forEach(button => {

            button.disabled =
                true;

        });

}


/* =========================================================
   KURANGI NYAWA
========================================================= */

function loseLife() {

    lives--;

    updateLives();

}


/* =========================================================
   UPDATE NYAWA
========================================================= */

function updateLives() {

    const livesElements = [

        document.getElementById(
            "life1"
        ),

        document.getElementById(
            "life2"
        ),

        document.getElementById(
            "life3"
        )

    ];


    livesElements.forEach(
        (element, index) => {

            if (!element) return;


            element.textContent =
                index < lives
                    ? "❤️"
                    : "🖤";

        }
    );

}


/* =========================================================
   UPDATE SCORE
========================================================= */

function updateScore() {

    if (!scoreElement) return;


    scoreElement.textContent =
        score.toLocaleString(
            "id-ID"
        );

}


/* =========================================================
   UPDATE COMBO
========================================================= */

function updateCombo() {

    if (!comboElement) return;


    comboElement.textContent =
        `🔥 ×${combo}`;

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const progress =
        (
            currentLevel /
            challenges.length
        ) * 100;


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }

}


/* =========================================================
   SOAL BERIKUTNYA
========================================================= */

function nextLevel() {

    currentLevel++;


    if (
        currentLevel >=
        challenges.length
    ) {

        endGame();

        return;

    }


    loadChallenge();

}


/* =========================================================
   POPUP XP
========================================================= */

function showXPPopup(text) {

    if (!xpPopup) return;


    xpPopup.textContent =
        text;


    xpPopup.classList.remove(
        "show"
    );


    void xpPopup.offsetWidth;


    xpPopup.classList.add(
        "show"
    );

}


/* =========================================================
   AKHIR GAME
========================================================= */

function endGame() {

    clearInterval(
        timerInterval
    );


    if (lives <= 0) {

        if (gameOverScore) {

            gameOverScore.textContent =
                score.toLocaleString(
                    "id-ID"
                );

        }


        playSound(
            "wrong"
        );


        showScreen(
            gameOverScreen
        );


    } else {

        playSound(
            "finish"
        );


        showScreen(
            resultScreen
        );


        calculateResult();

    }

}


/* =========================================================
   HASIL
========================================================= */

function calculateResult() {

    if (finalScore) {

        finalScore.textContent =
            score.toLocaleString(
                "id-ID"
            );

    }


    const rank =
        calculateRank();


    if (rankElement) {

        rankElement.textContent =
            rank;

    }


    const type =
        calculateBrainType();


    if (brainType) {

        brainType.textContent =
            type;

    }


    if (resultTitle) {

        resultTitle.textContent =
            type;

    }


    if (resultDescription) {

        resultDescription.textContent =
            getDescription(type);

    }


    if (resultQuote) {

        resultQuote.textContent =
            getQuote(type);

    }


    updateSkill(
        categoryStats.logic,
        logicScore,
        logicBar
    );


    updateSkill(
        categoryStats.memory,
        memoryScore,
        memoryBar
    );


    updateSkill(
        categoryStats.reaction,
        reactionScore,
        reactionBar
    );


    updateSkill(
        categoryStats.observation,
        observationScore,
        observationBar
    );


    updateBestScore();

    updateAchievements();

}


/* =========================================================
   RANK
========================================================= */

function calculateRank() {

    if (score >= 1450)
        return "SS";

    if (score >= 1250)
        return "S+";

    if (score >= 1050)
        return "S";

    if (score >= 850)
        return "A";

    if (score >= 650)
        return "B";

    if (score >= 400)
        return "C";

    return "D";

}


/* =========================================================
   TIPE OTAK
========================================================= */

function calculateBrainType() {

    const scores = {

        logic:
            getPercentage(
                categoryStats.logic
            ),

        memory:
            getPercentage(
                categoryStats.memory
            ),

        reaction:
            getPercentage(
                categoryStats.reaction
            ),

        observation:
            getPercentage(
                categoryStats.observation
            )

    };


    let highest =
        "logic";


    Object.keys(scores)
        .forEach(category => {

            if (
                scores[category] >
                scores[highest]
            ) {

                highest =
                    category;

            }

        });


    const types = {

        logic:
            "SANG STRATEGIS",

        memory:
            "SANG PENGINGAT",

        reaction:
            "SANG KILAT",

        observation:
            "SANG DETEKTIF"

    };


    return types[highest];

}


/* =========================================================
   DESKRIPSI TIPE
========================================================= */

function getDescription(type) {

    const descriptions = {

        "SANG STRATEGIS":
            "Kamu kuat dalam mencari pola, hubungan, dan cara paling cerdas untuk menyelesaikan masalah.",

        "SANG PENGINGAT":
            "Kekuatanmu ada pada kemampuan mengingat informasi dan memperhatikan detail.",

        "SANG KILAT":
            "Kamu cepat mengambil keputusan dan mampu berpikir di bawah tekanan.",

        "SANG DETEKTIF":
            "Kamu memiliki kemampuan mengamati detail yang sering dilewatkan orang lain."

    };


    return descriptions[type] ||
        "Cara berpikirmu memiliki karakteristik yang unik.";

}


/* =========================================================
   KUTIPAN
========================================================= */

function getQuote(type) {

    const quotes = {

        "SANG STRATEGIS":
            "🧠 Otak yang kuat bukan yang selalu cepat, tetapi yang tahu langkah terbaik.",

        "SANG PENGINGAT":
            "🧠 Apa yang dilupakan orang lain, kamu masih mengingatnya.",

        "SANG KILAT":
            "⚡ Berpikir cepat. Bertindak tepat.",

        "SANG DETEKTIF":
            "👁️ Perhatikan lebih dekat. Jawabannya mungkin ada di depan mata."

    };


    return quotes[type] ||
        "🧠 Jangan selalu percaya pada jawaban pertamamu.";

}


/* =========================================================
   PERSENTASE
========================================================= */

function getPercentage(stat) {

    if (
        stat.total === 0
    ) {

        return 0;

    }


    return Math.round(
        (
            stat.correct /
            stat.total
        ) * 100
    );

}


/* =========================================================
   UPDATE SKILL
========================================================= */

function updateSkill(
    stat,
    textElement,
    barElement
) {

    const percentage =
        getPercentage(stat);


    if (textElement) {

        textElement.textContent =
            `${percentage}%`;

    }


    if (barElement) {

        setTimeout(() => {

            barElement.style.width =
                `${percentage}%`;

        }, 200);

    }

}


/* =========================================================
   BEST SCORE
========================================================= */

function updateBestScore() {

    const oldBest =
        Number(
            localStorage.getItem(
                "outsmartBestScore"
            ) || 0
        );


    if (
        score > oldBest
    ) {

        localStorage.setItem(
            "outsmartBestScore",
            score
        );

    }


    const best =
        Math.max(
            score,
            oldBest
        );


    if (bestScore) {

        bestScore.textContent =
            `${best.toLocaleString(
                "id-ID"
            )} XP`;

    }


    if (bestScoreHome) {

        bestScoreHome.textContent =
            best.toLocaleString(
                "id-ID"
            );

    }

}


/* =========================================================
   ACHIEVEMENT
========================================================= */

function updateAchievements() {

    if (!achievementList)
        return;


    const achievements =
        achievementList.querySelectorAll(
            ".achievement"
        );


    const unlocked = [

        lives === 3,

        combo >= 5,

        score >= 1000,

        score >= 1450

    ];


    achievements.forEach(
        (achievement, index) => {

            if (
                unlocked[index]
            ) {

                achievement.classList.remove(
                    "locked"
                );


                achievement.classList.add(
                    "unlocked"
                );


                achievement.textContent =
                    achievement.textContent
                        .replace(
                            "🔒",
                            "🏆"
                        );

            }

        }
    );

}


/* =========================================================
   KEMBALI KE HOME
========================================================= */

function goHome() {

    clearInterval(
        timerInterval
    );


    playSound(
        "click"
    );


    showScreen(
        homeScreen
    );


    updateBestScore();

}


/* =========================================================
   SHARE
========================================================= */

async function shareResult() {

    playSound(
        "click"
    );


    const text = `

🧠 OUTSMART GAME

Skorku: ${score.toLocaleString("id-ID")} XP
Rank: ${rankElement?.textContent || "-"}
Tipe Otak: ${brainType?.textContent || "-"}

Berani mengalahkan skorku? 😎

`;


    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    "Outsmart Game",

                text:
                    text

            });


            if (shareStatus) {

                shareStatus.textContent =
                    "✓ Berhasil dibagikan!";

            }

        } catch (error) {

            // User membatalkan share.

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                text
            );


            if (shareStatus) {

                shareStatus.textContent =
                    "✓ Hasil berhasil disalin!";

            }

        } catch (error) {

            if (shareStatus) {

                shareStatus.textContent =
                    "Gagal menyalin hasil.";

            }

        }

    }

}


/* =========================================================
   THEME
========================================================= */

let darkMode = true;


function toggleTheme() {

    playSound(
        "click"
    );


    darkMode =
        !darkMode;


    if (!darkMode) {

        document.body.style.background =
            "linear-gradient(135deg,#eef2ff,#dfe7ff)";


        if (themeBtn) {

            themeBtn.textContent =
                "☀️";

        }

    } else {

        document.body.style.background =
            "";


        if (themeBtn) {

            themeBtn.textContent =
                "🌙";

        }

    }

}


/* =========================================================
   EVENT BUTTON
========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        startGame
    );

}


if (retryBtn) {

    retryBtn.addEventListener(
        "click",
        startGame
    );

}


if (retryGameOver) {

    retryGameOver.addEventListener(
        "click",
        startGame
    );

}


if (homeBtn) {

    homeBtn.addEventListener(
        "click",
        goHome
    );

}


if (homeGameOver) {

    homeGameOver.addEventListener(
        "click",
        goHome
    );

}


if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        shareResult
    );

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   JALANKAN AWAL
========================================================= */

updateBestScore();

updateLives();

updateScore();

updateCombo();