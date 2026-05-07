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
    "あ", "い", "う", "え", "お",  
    "か", "き", "く", "け", "こ",  
    "さ", "し", "す", "せ", "そ",  
    "た", "ち", "つ", "て", "と",  
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や",       "ゆ",       "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ",       "を",       "ん"  
];

let katakanaDeck = [
    "ア", "イ", "ウ", "エ", "オ",  
    "カ", "キ", "ク", "ケ", "コ",  
    "サ", "シ", "ス", "セ", "ソ",  
    "タ", "チ", "ツ", "テ", "ト",  
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ",       "ユ",       "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ",       "ヲ",       "ン"   
];

let progress = {
    kanji: 0,
    hiragana: 0,
    katakana: 0
}
let savedData = localStorage.getItem("progress");
let loadedProgress = JSON.parse(savedData) || {kanji: 0, hiragana: 0, katakana: 0};

let correct = JSON.parse(localStorage.getItem("correct")) || 0;
let incorrect = JSON.parse(localStorage.getItem("incorrect")) || 0;

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
const escBtn = document.querySelector(".esc_btn");
const front = document.querySelector(".front_card");
const back = document.querySelector(".back_card");

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
    charFront.textContent = word;
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

    if (deck !== kanjiDeck) {
        charBack.textContent = word;
        meaning.textContent = "phonetic symbol";
        reading.textContent = "N/A";
        return;
    }
    try {
        if (cache[word]) {
            charBack.textContent = word;
            meaning.textContent = cache[word].meanings.join(", ");
            reading.textContent = cache[word].kun_readings.join(", ");

            return;
        }
        const response = await fetch('https://kanjiapi.dev/v1/kanji/' + word);
        const data = await response.json();
        cache[word] = data;

        charBack.textContent = word;
        meaning.textContent = data.meanings.join(", ");
        reading.textContent = data.kun_readings.join(", ");
    } catch (error) {
       document.getElementById("word_display_back").textContent = "Error loading card";
            console.log(error);
    }
}

// ====================================
// SCORE & PROGRESS FUNCTIONS
// ====================================

function updateBtn(step) {
    currentIndex = (currentIndex + step);
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    if (currentDeckType) {
        loadedProgress[currentDeckType] = currentIndex;
    localStorage.setItem("progress", JSON.stringify(loadedProgress));
    }

    if (currentIndex == currentActiveDeck.length) {
        score = Math.round(correct / currentActiveDeck.length * 100);
        container.style.display = "none";
        
        localStorage.setItem("progress", JSON.stringify(loadedProgress));
        localStorage.setItem("score", JSON.stringify(score));
        displaySummary();
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
    currentActiveDeck = kanjiDeck;
    currentIndex = loadedProgress.kanji;
    if (currentIndex == 0) {
        currentActiveDeck = shuffleDeck([...kanjiDeck]);
    }
    showCard(currentActiveDeck);
    updateProgress();
});

hiragana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentDeckType = "hiragana";
    currentActiveDeck = hiraganaDeck;
    currentIndex = loadedProgress.hiragana;
    if (currentIndex == 0) {
        currentActiveDeck = shuffleDeck([...hiraganaDeck]);
    }
    showCard(currentActiveDeck);
    updateProgress();
});

katakana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentDeckType = "katakana";
    currentActiveDeck = katakanaDeck;
    currentIndex = loadedProgress.katakana;
    if (currentIndex == 0) {
        currentActiveDeck = shuffleDeck([...katakanaDeck]);
    }
    showCard(currentActiveDeck);
    updateProgress();
});

// ====================================
// EVENT LISTENERS: Card Interaction
// ====================================

hintBtn.addEventListener("click", function() {
    showHint(currentActiveDeck);
});

document.querySelectorAll(".esc_btn").forEach(btn=> { 
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
    localStorage.setItem("incorrect", JSON.stringify(incorrect));
    updateBtn(1);
});

goodBtn.addEventListener("click", function() {
    correct = correct + 1;
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