function calc() {
    const output = document.querySelector('.calculating__result span');
    if (!output) return;

    const values = {sex: localStorage.getItem('sex') || 'female', ratio: Number(localStorage.getItem('ratio')) || 1.375};
    const fields = ['height', 'weight', 'age'].map(id => document.getElementById(id));
    const isValid = field => field && field.value !== '' && field.validity.valid && Number(field.value) > 0;

    const calculate = () => {
        if (!fields.every(isValid)) {
            output.textContent = '—';
            return;
        }
        const [height, weight, age] = fields.map(field => Number(field.value));
        const base = values.sex === 'female'
            ? 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age
            : 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
        output.textContent = String(Math.round(base * values.ratio));
    };

    const setupGroup = (selector, key, readValue) => {
        const group = document.querySelector(selector);
        if (!group) return;
        const buttons = Array.from(group.querySelectorAll('button'));
        const selected = buttons.find(button => readValue(button) === values[key]) || buttons[0];
        if (!selected) return;
        const activate = button => {
            buttons.forEach(item => {
                const active = item === button;
                item.classList.toggle('calculating__choose-item_active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            values[key] = readValue(button);
            localStorage.setItem(key, String(values[key]));
            calculate();
        };
        activate(selected);
        group.addEventListener('click', event => {
            const button = event.target.closest('button');
            if (button && group.contains(button)) activate(button);
        });
    };

    setupGroup('#gender', 'sex', button => button.id);
    setupGroup('.calculating__choose_big', 'ratio', button => Number(button.dataset.ratio));
    fields.forEach(field => field?.addEventListener('input', () => {
        field.setAttribute('aria-invalid', String(field.value !== '' && !field.validity.valid));
        calculate();
    }));
    calculate();
}

export default calc;
