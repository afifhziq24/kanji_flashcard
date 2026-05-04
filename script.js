let currentIndex = 0;

let kanjiDeck = [
    { kanji: '日'}, { kanji: '一'}, { kanji: '国'}, { kanji: '人'},
    { kanji: '年'}, { kanji: '大'}, { kanji: '十'}, { kanji: '二'},
    { kanji: '本'}, { kanji: '中'}, { kanji: '長'}, { kanji: '出'},
    { kanji: '三'}, { kanji: '時'}, { kanji: '行'}, { kanji: '見'},
    { kanji: '月'}, { kanji: '分'}, { kanji: '後'}, { kanji: '前'},
    { kanji: '生'}, { kanji: '五'}, { kanji: '間'}, { kanji: '上'},
    { kanji: '東'}, { kanji: '四'}, { kanji: '今'}, { kanji: '金'},
    { kanji: '九'}, { kanji: '入'}, { kanji: '学'}, { kanji: '高'},
    { kanji: '円'}, { kanji: '子'}, { kanji: '外'}, { kanji: '八'},
    { kanji: '六'}, { kanji: '下'}, { kanji: '来'}, { kanji: '気'},
    { kanji: '小'}, { kanji: '七'}, { kanji: '山'}, { kanji: '話'},
    { kanji: '女'}, { kanji: '北'}, { kanji: '午'}, { kanji: '百'},
    { kanji: '書'}, { kanji: '先'}, { kanji: '名'}, { kanji: '川'},
    { kanji: '千'}, { kanji: '水'}, { kanji: '半'}, { kanji: '男'},
    { kanji: '西'}, { kanji: '電'}, { kanji: '校'}, { kanji: '語'},
    { kanji: '土'}, { kanji: '木'}, { kanji: '聞'}, { kanji: '食'},
    { kanji: '車'}, { kanji: '何'}, { kanji: '南'}, { kanji: '万'},
    { kanji: '毎'}, { kanji: '白'}, { kanji: '天'}, { kanji: '母'},
    { kanji: '火'}, { kanji: '右'}, { kanji: '読'}, { kanji: '友'},
    { kanji: '左'}, { kanji: '休'}, { kanji: '父'}, { kanji: '雨'}
]

async function fetchHint() {
   try {
       const response = await fetch('https://kanjiapi.dev/v1/kanji/' + kanjiDeck[currentIndex].kanji);
       const data = await response.json();
       back_card.querySelector('p').textContent = data.meanings.join(', ');
   } catch (error) {
       back_card.querySelector('p').textContent = 'Error fetching hint';
   }
    }


const kanji_deck = document.querySelector('.kanji_deck');
const hiragana_deck = document.querySelector('.hiragana_deck');
const katakana_deck = document.querySelector('.katakana_deck');
const modal_overlay = document.querySelector('.modal_overlay');
const front_card = document.querySelector('.front_card');
const back_card = document.querySelector('.back_card');
const esc_btn = document.querySelectorAll('.esc_btn');
const hint_btn = document.querySelectorAll('.hint_btn');

kanji_deck.addEventListener('click', () => {
    showKanjiCard();
    modal_overlay.style.display = 'flex';
});

hiragana_deck.addEventListener('click', () => {
    showHiraganaCard();
    modal_overlay.style.display = 'flex';
});

katakana_deck.addEventListener('click', () => {
    showKatakanaCard();
    modal_overlay.style.display = 'flex';
});

function showKanjiCard() {
    front_card.style.display = 'flex';
    back_card.style.display = 'none';
    front_card.querySelector('p').textContent = kanjiDeck[currentIndex].kanji;
}

function showHiraganaCard() {
    front_card.style.display = 'flex';
    back_card.style.display = 'none';
    front_card.querySelector('p').textContent = hiraganaDeck[currentIndex].hiragana;
}

function showKatakanaCard() {
    front_card.style.display = 'flex';
    back_card.style.display = 'none';
    front_card.querySelector('p').textContent = katakanaDeck[currentIndex].katakana;
}

function nextKanjiCard() {
    currentIndex++;
    showKanjiCard();
}

function showBackCard() {
    front_card.style.display = 'none';
    back_card.style.display = 'flex';
    fetchHint();
}

esc_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal_overlay.style.display = 'none';
    });
});

hint_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        showBackCard();
    });
});