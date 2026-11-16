import {getResource} from '../services/services';
function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes.length ? classes : ['menu__item'];
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            element.classList.add(...this.classes);

            const image = document.createElement('img');
            image.src = this.src;
            image.alt = this.alt;

            const title = document.createElement('h3');
            title.className = 'menu__item-subtitle';
            title.textContent = this.title;

            const description = document.createElement('div');
            description.className = 'menu__item-descr';
            description.textContent = this.descr;

            const divider = document.createElement('div');
            divider.className = 'menu__item-divider';

            const price = document.createElement('div');
            price.className = 'menu__item-price';
            const cost = document.createElement('div');
            cost.className = 'menu__item-cost';
            cost.textContent = 'Цена:';
            const total = document.createElement('div');
            total.className = 'menu__item-total';
            const amount = document.createElement('span');
            amount.textContent = String(this.price);
            total.append(amount, document.createTextNode(' грн/день'));
            price.append(cost, total);

            element.append(image, title, description, divider, price);
            this.parent.append(element);
        }
    }

    getResource('menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        })
        .catch(() => {
            const menu = document.querySelector('.menu .container');
            const status = document.createElement('p');
            status.className = 'preview-status';
            status.setAttribute('role', 'alert');
            status.textContent = 'Меню пока недоступно. Обновите страницу позже.';
            menu?.append(status);
        });
}

export default cards;
