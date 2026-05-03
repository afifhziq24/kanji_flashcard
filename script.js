const kanji_deck = document.querySelector('.kanji_deck');
const hiragana_deck = document.querySelector('.hiragana_deck');
const katakana_deck = document.querySelector('.katakana_deck');
const modal_overlay = document.querySelector('.modal_overlay');
const front_card = document.querySelector('.front_card');
const back_card = document.querySelector('.back_card');
const esc_btn = document.querySelectorAll('.esc_btn');
const hint_btn = document.querySelectorAll('.hint_btn');

kanji_deck.addEventListener('click', () => {
    modal_overlay.style.display = 'flex';
});

hiragana_deck.addEventListener('click', () => {
    modal_overlay.style.display = 'flex';
});

katakana_deck.addEventListener('click', () => {
    modal_overlay.style.display = 'flex';
});

esc_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal_overlay.style.display = 'none';
    });
});

hint_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        back_card.style.display = 'flex';
        front_card.style.display = 'none';
    });
});