const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function getSavedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (error) {
        console.warn('Tema tidak bisa dibaca dari penyimpanan browser:', error);
        return null;
    }
}

function applyTheme(theme, save = false) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);

    if (toggleButton) {
        toggleButton.setAttribute('aria-pressed', String(currentTheme === 'dark'));
    }

    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    if (save) {
        try {
            localStorage.setItem('theme', currentTheme);
        } catch (error) {
            console.warn('Tema tidak bisa disimpan di browser:', error);
        }
    }
}

if (toggleButton) {
    const savedTheme = getSavedTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    toggleButton.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark', true);
    });
}