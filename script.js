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
    "な", "に", "ぬ", "ね", "の"   
];

let katakanaDeck = [
    "ア", "イ", "ウ", "エ", "オ",  
    "カ", "キ", "ク", "ケ", "コ",  
    "サ", "シ", "ス", "セ", "ソ",  
    "タ", "チ", "ツ", "テ", "ト",  
    "ナ", "ニ", "ヌ", "ネ", "ノ"   
];

//variable for card
const container = document.querySelector(".modal_overlay");
const charFront = document.getElementById("word_display_front");
const charBack = document.getElementById("word_display_back");
const meaning = document.getElementById("meaning_display");
const reading = document.getElementById("reading_display");
const hintBtn = document.querySelector(".hint_btn");
const escBtn = document.querySelector(".esc_btn");

const front = document.querySelector(".front_card");
const back = document.querySelector(".back_card");

const prevBtn = document.getElementById("prev_btn");
const hardBtn = document.getElementById("hard_btn");
const goodBtn = document.getElementById("good_btn");

//variable for deck
const kanji_deck = document.querySelector(".kanji_deck");
const hiragana_deck = document.querySelector(".hiragana_deck");
const katakana_deck = document.querySelector(".katakana_deck");

const saved = localStorage.getItem("currentIndex");
let currentIndex = saved !== null ? JSON.parse(saved) : 0;
let currentActiveDeck = [];

function showCard(deck) {
    const word = deck[currentIndex];
    charFront.textContent = word;
};

async function showHint(deck) {
    front.style.display = "none";
    back.style.display = "flex";
    hintBtn.style.display = "none";
    const word = deck[currentIndex];
    try {
        const response = await fetch('https://kanjiapi.dev/v1/kanji/' + word);
        const data = await response.json();

        charBack.textContent = word;
        meaning.textContent = data.meanings.join(", ");
        reading.textContent = data.kun_readings.join(", ");
    } catch (error) {
       document.getElementById("word-display").textContent = "Error loading card";
            console.log(error);
    }
};

kanji_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentActiveDeck = kanjiDeck;
    showCard(currentActiveDeck);
});

hiragana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentActiveDeck = hiraganaDeck;
    showCard(currentActiveDeck);
});

katakana_deck.addEventListener("click", function() {
    container.style.display = "flex";
    currentActiveDeck = katakanaDeck;
    showCard(currentActiveDeck);
});

hintBtn.addEventListener("click", function() {
    showHint(currentActiveDeck);
});

escBtn.addEventListener("click", function() {
    container.style.display = "none";
});

hardBtn.addEventListener("click", function() {
    hintBtn.style.display = "flex";
    front.style.display = "flex";
    back.style.display = "none";
    currentIndex = (currentIndex + 1) % currentActiveDeck.length;
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    showCard(currentActiveDeck);
});

goodBtn.addEventListener("click", function() {
    hintBtn.style.display = "flex";
    front.style.display = "flex";
    back.style.display = "none";
    currentIndex = (currentIndex + 1) % currentActiveDeck.length;
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    showCard(currentActiveDeck);
});

prevBtn.addEventListener("click", function() {
    hintBtn.style.display = "flex";
    front.style.display = "flex";
    back.style.display = "none";
    currentIndex = (currentIndex - 1 + currentActiveDeck.length) % currentActiveDeck.length;
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    showCard(currentActiveDeck);
})