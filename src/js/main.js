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

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
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

    // use class for card

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            this.parentSelector = document.querySelector(parentSelector)
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parentSelector.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    
    // реализация отправки данных на сервер

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Ваши данные успешно отправлены',
        error: "что то пошло не так"
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', '.././server.php');
            request.setRequestHeader('Content-type', 'application.json');
            const formData = new FormData(form); // это специальный объект который позволяет нам с определенной формой сформировать данные в виде ключ: значение

            const object = {}; // чтобы данные были в виде json формата
            formData.forEach((values, keys) => {
                object[keys] = values;
            })
            const json = JSON.stringify(object)

            request.send(json);

            request.addEventListener('load', () => { 
                if (request.status === 200) {
                    console.log(request.response);
                    showModalThanks(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showModalThanks(message.error);
                }
            });
        });  
    };

    //
    function showModalThanks(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        const thanksModal = document.createElement('div');
        openModalWindow();

        modalDialog.classList.add('hide');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }
});