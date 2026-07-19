let currentPosition = 1;                                 // 1 — первый реальный слайд, total+1 — клон первого

const slides = document.querySelectorAll('.slide:not(.clone)');
const total = slides.length;                            // Общее количество слайдов

const track = document.getElementById('slides');        // Контейнер-трек со слайдами
const info = document.getElementById('info');           // Элемент для текстовой информации
const dots = document.getElementById('dots');           // Контейнер для точек пагинации
const allSlides = document.querySelectorAll('.slide');  // Все слайды (включая клоны)

// Создание точек пагинации по числу реальных слайдов
for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';                              // Базовый класс для стилизации
    dot.dataset.index = i;                              // Сохранение индекса слайда
    dot.onclick = () => goTo(i);                        // Переключение по клику на точку
    dots.appendChild(dot);                              // Добавление точки в контейнер
}

/**
 * Обновление слайдера: позиция, информация, пагинация
 * @param {boolean} instant - true — без анимации
 */
function update(instant = false) {
    const offset = -currentPosition * 100;              // Расчёт смещения трека в процентах
    track.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${offset}%)`;   // Применение смещения к треку

    const realIndex = (currentPosition - 1 + total) % total; // Вычисление реального индекса (без учёта клонов)
    info.textContent = `Изображение ${realIndex + 1} из ${total}`; // Обновление текстовой информации

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === realIndex);  // Подсветка активной точки
    });
}

/** Переключение на слайд по индексу (отсчёт от 0) */
function goTo(index) {
    currentPosition = index + 1;                        // Установка позиции с учётом клона в начале
    update();                                           // Анимированный переход
}

/** Переключение на следующий слайд с эффектом бесконечной прокрутки */
function next() {
    currentPosition++;                                  // Увеличение позиции для движения вправо
    update();                                           // Анимированный переход

    if (currentPosition === total + 1) {                // Проверка достижения клона первого слайда
        setTimeout(() => {
            currentPosition = 1;                        // Переход на реальный первый слайд
            update(true);                               // Мгновенное перемещение без анимации
        }, 500);                                        // Ожидание завершения анимации
    }
}

/** Переключение на предыдущий слайд с эффектом бесконечной прокрутки */
function prev() {
    currentPosition--;                                  // Уменьшение позиции для движения влево
    update();                                           // Анимированный переход

    if (currentPosition === 0) {                        // Проверка достижения клона последнего слайда
        setTimeout(() => {
            currentPosition = total;                    // Переход на реальный последний слайд
            update(true);                               // Мгновенное перемещение без анимации
        }, 500);                                        // Ожидание завершения анимации
    }
}

// Подключение обработчиков для кнопок управления
document.getElementById('next').onclick = next;         // Кнопка «Вперёд»
document.getElementById('prev').onclick = prev;         // Кнопка «Назад»

// Добавление поддержки клавиатурного управления
document.onkeydown = (e) => {
    if (e.key === 'ArrowRight') next();                // Стрелка вправо — следующий слайд
    if (e.key === 'ArrowLeft') prev();                 // Стрелка влево — предыдущий слайд
};

// Инициализация слайдера — отображение первого слайда без анимации
update(true);
