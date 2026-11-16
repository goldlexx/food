import {getApiBaseUrl, postData} from '../services/services';

function forms(selector) {
    document.querySelectorAll(selector).forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const submit = form.querySelector('[type="submit"]');
            if (submit) submit.disabled = true;

            let message;
            try {
                if (!getApiBaseUrl()) {
                    message = 'Это публичное демо: заявки не отправляются.';
                } else {
                    await postData('requests', JSON.stringify(Object.fromEntries(new FormData(form).entries())));
                    message = 'Тестовая запись сохранена в локальном демо-сервере.';
                    form.reset();
                }
            } catch {
                message = 'Не удалось сохранить тестовую запись. Проверьте локальный демо-сервер.';
            } finally {
                if (submit) submit.disabled = false;
            }

            const dialog = form.closest('.modal__dialog');
            const status = document.createElement('p');
            status.className = 'form-status';
            status.setAttribute('role', 'status');
            status.textContent = message;
            dialog.querySelector('.form-status')?.remove();
            form.insertAdjacentElement('afterend', status);
        });
    });
}

export default forms;
