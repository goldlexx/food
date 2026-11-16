let previouslyFocused;

function closeModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;
    modal.classList.add('hide');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    previouslyFocused?.focus();
}

function openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;
    previouslyFocused = document.activeElement;
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('input, button')?.focus();
}

function modal(triggerSelector, modalSelector) {
    const dialog = document.querySelector(modalSelector);
    if (!dialog) return;
    document.querySelectorAll(triggerSelector).forEach(button => {
        button.addEventListener('click', () => openModal(modalSelector));
    });
    dialog.addEventListener('click', event => {
        if (event.target === dialog || event.target.closest('[data-close]')) closeModal(modalSelector);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && dialog.classList.contains('show')) closeModal(modalSelector);
    });
}

export default modal;
export {closeModal, openModal};
