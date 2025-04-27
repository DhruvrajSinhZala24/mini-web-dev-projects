const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const spinner = document.getElementById('spinner');
const qrContainer = document.getElementById('qrcode');
const urlInput = document.getElementById('url');
const sizeSelect = document.getElementById('size');
const filenameInput = document.getElementById('filename');
const themeToggle = document.getElementById('theme-toggle');

let qr;

generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    const size = parseInt(sizeSelect.value);

    if (!isValidUrl(url)) {
        alert('Please enter a valid URL!');
        return;
    }

    qrContainer.innerHTML = '';
    downloadBtn.classList.add('hidden');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');

        qr = new QRCode(qrContainer, {
            text: url,
            width: size,
            height: size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.classList.remove('hidden');
    }, 1000);
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

downloadBtn.addEventListener('click', () => {
    const filename = filenameInput.value.trim() || 'qr-code';
    const canvas = qrContainer.querySelector('canvas');

    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename + '.png';
        link.click();
    }
});

// Theme switch logic
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme', themeToggle.checked);
    if (themeToggle.checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
});
