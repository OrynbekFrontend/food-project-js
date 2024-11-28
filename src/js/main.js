window.addEventListener('DOMContentLoaded', () => {
    // Табы
    const tabs = document.querySelectorAll('.tabheader__item'),
    parentTabs = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent');
    
    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // Скрыть контент всех вкладок
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Удалить класс активности у всех вкладок
        });
    };

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade') // Показать контент вкладки по индексу i
        tabsContent[i].classList.remove('hide') // Показать контент вкладки по индексу i
        tabs[i].classList.add('tabheader__item_active'); // Добавить класс активности вкладке
    };

    hideTabsContent(); // Скрыть весь контент и сбросить активные вкладки
    showTabsContent(); // Показать первую вкладку и сделать её активной

    parentTabs.addEventListener('click', (event) => {
        const target = event.target; // Элемент, на который кликнул пользователь

        if (target && target.classList.contains('tabheader__item')) { // Проверка, что клик был по вкладке
            tabs.forEach((item, i) => { // Перебор всех вкладок
                if (target == item) { // Если кликнутая вкладка совпадает с текущей в цикле
                    hideTabsContent(); // Скрыть все вкладки
                    showTabsContent(i); // Показать контент для кликнутой вкладки
                }
            })
        }
    });

    // таймер обратного отсчета

    const deadline = '2022-11-30'; // строка с датой и временем оканчания
    
    function getTimeRemaining(endtime) { // эта функция вычисляет оставшееся время до указанной даты
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

              return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              }
    };

    function getZero(num) { // добавляет 0 если ичисло меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    function setClock(selector, endtime) { // основная функция. Находит элемент таймера по селектору.
        // Обновляет отображение времени каждую секунду.
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // чтобы при обновлений страницы таймер не обновлялся

        function updateClock() { // выводит вычисления на экран и останавливает функ по истечения срока
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };

    };

    setClock('.timer', deadline);

    // modal 

    const openModal = document.querySelectorAll('[data-modal]'),
          closeModalWindow = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal');

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
        // modalWindow.classList.toggle('show');
    };

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
        // modalWindow.classList.toggle('show');
    };

    openModal.forEach(item => {
        item.addEventListener('click', openModalWindow);
    });

    closeModalWindow.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            closeModal();
        }
    }); // при клике за пределы модального окна наше окно закрывается

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    }); // аналогичная ситуация только при клике на esc

    const modalTimerId = setTimeout(openModalWindow, 35000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
});