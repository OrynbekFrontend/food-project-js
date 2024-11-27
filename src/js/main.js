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
});