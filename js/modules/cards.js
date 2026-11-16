import {getResource} from '../services/services';

function cards() {
    const menu = document.querySelector('.menu-grid');
    if (!menu) return;

    getResource('menu')
        .then(items => {
            if (!Array.isArray(items) || !items.length) throw new Error('Menu is empty');
            const fragment = document.createDocumentFragment();

            items.forEach(({img, altimg, title, descr}) => {
                const card = document.createElement('article');
                card.className = 'menu__item';

                const image = document.createElement('img');
                image.src = img;
                image.alt = altimg || title || 'Пример блюда';
                image.loading = 'lazy';
                image.decoding = 'async';
                image.addEventListener('error', () => {
                    image.removeAttribute('src');
                    image.alt = 'Изображение недоступно';
                    image.classList.add('image-unavailable');
                }, {once: true});

                const content = document.createElement('div');
                content.className = 'menu__item-body';
                const heading = document.createElement('h3');
                heading.className = 'menu__item-subtitle';
                heading.textContent = title || 'Пример меню';
                const description = document.createElement('p');
                description.className = 'menu__item-descr';
                description.textContent = descr || 'Демонстрационные данные.';
                const label = document.createElement('span');
                label.className = 'sample-label';
                label.textContent = 'ДЕМО-ПРИМЕР';

                content.append(heading, description, label);
                card.append(image, content);
                fragment.append(card);
            });

            menu.replaceChildren(fragment);
        })
        .catch(() => {
            const status = document.createElement('p');
            status.className = 'preview-status';
            status.setAttribute('role', 'alert');
            status.textContent = 'Примеры меню сейчас недоступны. Обновите страницу позже.';
            menu.replaceChildren(status);
        });
}

export default cards;
