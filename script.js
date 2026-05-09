// ====================================
// DATA: Decks and Progress
// ====================================

let kanjiDeck = [
    '日', '一', '国', '人',
    '年', '大', '十', '二',
    '本', '中', '長', '出',
    '三', '時', '行', '見',
    '月', '分', '後', '前',
    '生', '五', '間', '上',
    '東', '四', '今', '金',
    '九', '入', '学', '高',
    '円', '子', '外', '八',
    '六', '下', '来', '気',
    '小', '七', '山', '話',
    '女', '北', '午', '百',
    '書', '先', '名', '川',
    '千', '水', '半', '男',
    '西', '電', '校', '語',
    '土', '木', '聞', '食',
    '車', '何', '南', '万',
    '毎', '白', '天', '母',
    '火', '右', '読', '友',
    '左', '休', '父', '雨'
];

let hiraganaDeck = [
    { char: "あ", reading: "a" }, { char: "い", reading: "i" }, { char: "う", reading: "u" }, { char: "え", reading: "e" }, { char: "お", reading: "o" },
    { char: "か", reading: "ka" }, { char: "き", reading: "ki" }, { char: "く", reading: "ku" }, { char: "け", reading: "ke" }, { char: "こ", reading: "ko" },
    { char: "さ", reading: "sa" }, { char: "し", reading: "shi" }, { char: "す", reading: "su" }, { char: "せ", reading: "se" }, { char: "そ", reading: "so" },
    { char: "た", reading: "ta" }, { char: "ち", reading: "chi" }, { char: "つ", reading: "tsu" }, { char: "て", reading: "te" }, { char: "と", reading: "to" },
    { char: "な", reading: "na" }, { char: "に", reading: "ni" }, { char: "ぬ", reading: "nu" }, { char: "ね", reading: "ne" }, { char: "の", reading: "no" },
    { char: "は", reading: "ha" }, { char: "ひ", reading: "hi" }, { char: "ふ", reading: "fu" }, { char: "へ", reading: "he" }, { char: "ほ", reading: "ho" },
    { char: "ま", reading: "ma" }, { char: "み", reading: "mi" }, { char: "む", reading: "mu" }, { char: "め", reading: "me" }, { char: "も", reading: "mo" },
    { char: "や", reading: "ya" }, { char: "ゆ", reading: "yu" }, { char: "よ", reading: "yo" },
    { char: "ら", reading: "ra" }, { char: "り", reading: "ri" }, { char: "る", reading: "ru" }, { char: "れ", reading: "re" }, { char: "ろ", reading: "ro" },
    { char: "わ", reading: "wa" }, { char: "を", reading: "wo" }, { char: "ん", reading: "n" }
];

let katakanaDeck = [
    { char: "ア", reading: "a" }, { char: "イ", reading: "i" }, { char: "ウ", reading: "u" }, { char: "エ", reading: "e" }, { char: "オ", reading: "o" },
    { char: "カ", reading: "ka" }, { char: "キ", reading: "ki" }, { char: "ク", reading: "ku" }, { char: "ケ", reading: "ke" }, { char: "コ", reading: "ko" },
    { char: "サ", reading: "sa" }, { char: "シ", reading: "shi" }, { char: "ス", reading: "su" }, { char: "セ", reading: "se" }, { char: "ソ", reading: "so" },
    { char: "タ", reading: "ta" }, { char: "チ", reading: "chi" }, { char: "ツ", reading: "tsu" }, { char: "テ", reading: "te" }, { char: "ト", reading: "to" },
    { char: "ナ", reading: "na" }, { char: "ニ", reading: "ni" }, { char: "ヌ", reading: "nu" }, { char: "ネ", reading: "ne" }, { char: "ノ", reading: "no" },
    { char: "ハ", reading: "ha" }, { char: "ヒ", reading: "hi" }, { char: "フ", reading: "fu" }, { char: "ヘ", reading: "he" }, { char: "ホ", reading: "ho" },
    { char: "マ", reading: "ma" }, { char: "ミ", reading: "mi" }, { char: "ム", reading: "mu" }, { char: "メ", reading: "me" }, { char: "モ", reading: "mo" },
    { char: "ヤ", reading: "ya" }, { char: "ユ", reading: "yu" }, { char: "ヨ", reading: "yo" },
    { char: "ラ", reading: "ra" }, { char: "リ", reading: "ri" }, { char: "ル", reading: "ru" }, { char: "レ", reading: "re" }, { char: "ロ", reading: "ro" },
    { char: "ワ", reading: "wa" }, { char: "ヲ", reading: "wo" }, { char: "ン", reading: "n" }
];

// ====================================
// STATS: session & persisted counters
// ====================================

let streak = Number(localStorage.getItem("streak")) || 0;
let correct = JSON.parse(localStorage.getItem("correct")) || 0;
let incorrect = JSON.parse(localStorage.getItem("incorrect")) || 0;
let dailyCorrect = JSON.parse(localStorage.getItem("dailyCorrect")) || 0;
let dailyIncorrect = JSON.parse(localStorage.getItem("dailyIncorrect")) || 0;

const today = new Date();
const dateString = today.toISOString().split("T")[0];
const lastActive = localStorage.getItem("lastActiveDate");

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = yesterday.toISOString().split("T")[0];

if (lastActive === dateString) {
    // same day — keep daily counters
} else if (lastActive === yesterdayString) {
    // new day after yesterday — reset daily counters and bump streak
    dailyCorrect = 0;
    dailyIncorrect = 0;
    streak++;
} else {
    // gap of more than one day — reset streak and daily counters
    streak = 0;
    dailyCorrect = 0;
    dailyIncorrect = 0;
}

localStorage.setItem("lastActiveDate", dateString);
localStorage.setItem("streak", streak);

let progress = {
    kanji: 0,
    hiragana: 0,
    katakana: 0
}
let savedData = localStorage.getItem("progress");
let loadedProgress;

try {
    const parsed = JSON.parse(savedData);
    if (parsed && typeof parsed === 'object' && 'kanji' in parsed) {
        loadedProgress = parsed;
    } else {
        throw new Error("invalid structure");
    }
}catch(e) {
    loadedProgress = {
        kanji: 0,
        hiragana: 0,
        katakana: 0
    }
    localStorage.setItem("progress", JSON.stringify(loadedProgress));
}
let currentIndex = localStorage.getItem("currentIndex") !== null ? JSON.parse(localStorage.getItem("currentIndex")) : 0;
let currentActiveDeck = [];
let score = 0;
const cache = {};

// ====================================
// DOM ELEMENTS: Card Display
// ====================================

const container = document.querySelector(".card_container");
const summary = document.querySelector(".summary");
const charFront = document.getElementById("word_display_front");
const charBack = document.getElementById("word_display_back");
const meaning = document.getElementById("meaning_display");
const reading = document.getElementById("reading_display");
const hintBtn = document.querySelector(".hint_btn");
const escBtn = document.querySelectorAll(".esc_btn");

// ====================================
// DOM ELEMENTS: Buttons
// ====================================

const prevBtn = document.getElementById("prev_btn");
const hardBtn = document.getElementById("hard_btn");
const goodBtn = document.getElementById("good_btn");

// ====================================
// DOM ELEMENTS: Deck Selection & Summary
// ====================================

let currentDeckType = "";
const kanji_deck = document.querySelector(".kanji_deck");
const hiragana_deck = document.querySelector(".hiragana_deck");
const katakana_deck = document.querySelector(".katakana_deck");

const Score = document.querySelector(".score");
const accuracy = document.querySelector(".accuracy");

const label = document.getElementById("label");
const progressFill = document.getElementById("progress_fill");

const labelKanji = document.getElementById("label_kanji");
const progressFillKanji = document.getElementById("progress_fill_kanji");

const labelHiragana = document.getElementById("label_hiragana");
const progressFillHiragana = document.getElementById("progress_fill_hiragana");

const labelKatakana = document.getElementById("label_katakana");
const progressFillKatakana = document.getElementById("progress_fill_katakana");

// ====================================
// UTILITY FUNCTIONS
// ====================================

function shuffleDeck(deck) {
    for (let i = deck.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// ====================================
// CARD DISPLAY FUNCTIONS
// ====================================

function showCard(deck) {
    const word = deck[currentIndex];
    charFront.textContent = typeof word === 'object' ? word.char : word;
}

function cardFlip() {
    document.getElementById("card_inner").classList.toggle("flipped");
}

function removeFlip() {
    document.getElementById("card_inner").classList.remove("flipped");
}


// ====================================
// API FUNCTIONS
// ====================================

async function showHint(deck) {
    hintBtn.style.display = "none";
    cardFlip();
    const word = deck[currentIndex];
    // Show loading state
    charBack.textContent = "";
    meaning.textContent = "Loading...";
    reading.textContent = "";

    if (currentDeckType === "hiragana") {
        charBack.textContent = word.char;
        meaning.textContent = word.reading;
        reading.textContent = "";
        return;
    } else if (currentDeckType === "katakana") {
        charBack.textContent = word.char;
        meaning.textContent = word.reading;
        reading.textContent = "";
        return;
    }
    try {
        if (cache[word]) {
            charBack.textContent = word;
            meaning.textContent = cache[word].meanings.join(", ") ?? "No meaning found";
            reading.textContent = cache[word].kun_readings.join(", ") ?? "";

            return;
        }
        const response = await fetch('https://kanjiapi.dev/v1/kanji/' + word);
        if (!response.ok) {
            throw new Error("API returned status: " + response.status)
        }
        const data = await response.json();
        cache[word] = data;

        charBack.textContent = word;
        meaning.textContent = data.meanings.join(", ") ?? "No meaning found";
        reading.textContent = data.kun_readings.join(", ") ?? "";
    } catch (error) {
       document.getElementById("word_display_back").textContent = "Error loading card";
            console.log(error);
    }
}

// ====================================
// SCORE & PROGRESS FUNCTIONS
// ====================================

function updateBtn(step) {
    currentIndex = Math.max(0, Math.min(currentIndex + step, currentActiveDeck.length));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    if (currentDeckType) {
        loadedProgress[currentDeckType] = currentIndex;
    localStorage.setItem("progress", JSON.stringify(loadedProgress));
    }

    if (currentIndex == currentActiveDeck.length) {
        if (correct === 0 || currentActiveDeck.length === 0) {
            score = 0;
        } else {
            score = Math.round(correct / currentActiveDeck.length * 100);
        }
        container.style.display = "none";
        
        localStorage.setItem("progress", JSON.stringify(loadedProgress));
        localStorage.setItem("score", JSON.stringify(score));
        displaySummary();
        return;
    }

    removeFlip();
    hintBtn.style.display = "flex";
    showCard(currentActiveDeck);
    updateProgress();
}

function displaySummary() {
    document.querySelector(".summary").style.display = "flex";
    Score.textContent = score + "%";
    accuracy.textContent = correct + "/" + currentActiveDeck.length;
}

function updateProgress() {
    const total = currentActiveDeck.length;
    const current = currentIndex + 1;

    labelKanji.textContent = loadedProgress.kanji + "/" + kanjiDeck.length;
    labelHiragana.textContent = loadedProgress.hiragana + "/" + hiraganaDeck.length;
    labelKatakana.textContent = loadedProgress.katakana + "/" + katakanaDeck.length;

    progressFillKanji.style.width = ((loadedProgress.kanji/kanjiDeck.length) * 100) + "%";
    progressFillHiragana.style.width = ((loadedProgress.hiragana/hiraganaDeck.length) * 100) + "%";
    progressFillKatakana.style.width = ((loadedProgress.katakana/katakanaDeck.length) * 100) + "%";

    const scoreAcc = document.querySelector(".score_acc");
    let dailyAcc = Math.round(dailyCorrect/(dailyCorrect+dailyIncorrect) * 100) || 0;
    scoreAcc.textContent = dailyAcc + "%";

    if (total > 0) {
        const percent = (current / total) * 100;
        label.textContent = current + "/" + total;
        progressFill.style.width = percent + "%";
    }
}

// ====================================
// EVENT LISTENERS: Deck Selection
// ====================================

kanji_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentDeckType = "kanji";

    let savedShuffled = localStorage.getItem("shuffled_kanji");
    if (savedShuffled) {
        currentActiveDeck = JSON.parse(savedShuffled);
    } else {
        currentActiveDeck = shuffleDeck([...kanjiDeck]);
        localStorage.setItem("shuffled_kanji", JSON.stringify(currentActiveDeck));
    }
    currentIndex = loadedProgress.kanji;
    showCard(currentActiveDeck);
    updateProgress();
});

hiragana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentDeckType = "hiragana";

    let savedShuffled = localStorage.getItem("shuffled_hiragana");
    if (savedShuffled) {
        currentActiveDeck = JSON.parse(savedShuffled);
    } else {
        currentActiveDeck = shuffleDeck([...hiraganaDeck]);
        localStorage.setItem("shuffled_hiragana", JSON.stringify(currentActiveDeck));
    }
    currentIndex = loadedProgress.hiragana;
    showCard(currentActiveDeck);
    updateProgress();
});

katakana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentDeckType = "katakana";

    let savedShuffled = localStorage.getItem("shuffled_katakana");
    if (savedShuffled) {
        currentActiveDeck = JSON.parse(savedShuffled);
    } else {
        currentActiveDeck = shuffleDeck([...katakanaDeck]);
        localStorage.setItem("shuffled_katakana", JSON.stringify(currentActiveDeck));
    }
    currentIndex = loadedProgress.katakana;
    showCard(currentActiveDeck);
    updateProgress();
});

// ====================================
// EVENT LISTENERS: Card Interaction
// ====================================

hintBtn.addEventListener("click", function() {
    showHint(currentActiveDeck);
});

escBtn.forEach(btn=> { 
    btn.addEventListener("click", function() {
        if (currentActiveDeck.length > 0 && currentIndex === currentActiveDeck.length) {
            loadedProgress[currentDeckType] = 0;
            localStorage.setItem("progress", JSON.stringify(loadedProgress));

            incorrect = 0;
            correct = 0;
            localStorage.setItem("incorrect", JSON.stringify(incorrect));
            localStorage.setItem("correct", JSON.stringify(correct));
            currentDeckType = "";
            currentActiveDeck = [];

            currentIndex = 0;
            localStorage.setItem("currentIndex", JSON.stringify(0));
            localStorage.removeItem("shuffled_kanji");
            localStorage.removeItem("shuffled_hiragana");
            localStorage.removeItem("shuffled_katakana");
            updateProgress();
        }
        container.style.display = "none";
        document.querySelector(".summary").style.display ="none";
    });
});

// ====================================
// EVENT LISTENERS: Answer Buttons
// ====================================

hardBtn.addEventListener("click", function() {
    incorrect = incorrect + 1;
    dailyIncorrect++;
    localStorage.setItem("dailyIncorrect", JSON.stringify(dailyIncorrect));
    localStorage.setItem("incorrect", JSON.stringify(incorrect));
    updateBtn(1);
});

goodBtn.addEventListener("click", function() {
    correct = correct + 1;
    dailyCorrect++;
    localStorage.setItem("dailyCorrect", JSON.stringify(dailyCorrect));
    localStorage.setItem("correct", JSON.stringify(correct));
    updateBtn(1);
});

prevBtn.addEventListener("click", function() {
    updateBtn(-1);
});

// ====================================
// INITIALIZATION
// ====================================

updateProgress();