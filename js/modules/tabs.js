function tabs(tabsSelector, contentSelector, parentSelector, activeClass) {
    const tabList = document.querySelector(parentSelector);
    const tabButtons = Array.from(document.querySelectorAll(tabsSelector));
    const panels = Array.from(document.querySelectorAll(contentSelector));
    if (!tabList || !tabButtons.length || tabButtons.length !== panels.length) return;

    const activate = index => {
        tabButtons.forEach((button, position) => {
            const selected = position === index;
            button.classList.toggle(activeClass, selected);
            button.setAttribute('aria-selected', String(selected));
            button.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
        });
    };

    activate(0);
    tabList.addEventListener('click', event => {
        const button = event.target.closest(tabsSelector);
        if (button && tabList.contains(button)) activate(tabButtons.indexOf(button));
    });
    tabList.addEventListener('keydown', event => {
        const current = tabButtons.indexOf(document.activeElement);
        if (current < 0 || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabButtons.length - 1 :
            (current + (event.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length;
        tabButtons[next].focus();
        activate(next);
    });
}

export default tabs;
