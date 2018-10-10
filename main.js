const toggleDrawer = (toggle) => {
    const drawer = toggle.parentElement;

    if (drawer.getAttribute('data-expanded') !== 'true') {
        drawer.setAttribute('data-expanded', 'true');
    } else {
        drawer.setAttribute('data-expanded', 'false');
    }
};


[...document.querySelectorAll('.drawer__toggle')].forEach((drawer) => {
    drawer.addEventListener('click', () => {
        toggleDrawer(drawer);
    })
});

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker.register('/sw.js');

    });

}