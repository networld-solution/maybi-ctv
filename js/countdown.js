function initCountdown() {
    function updateCountdown() {
        let days = 5;
        let hours = 12;
        let minutes = 45;
        let seconds = 30;

        setInterval(() => {
            seconds--;

            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            if (minutes < 0) {
                minutes = 59;
                hours--;
            }

            if (hours < 0) {
                hours = 23;
                days--;
            }
            
            if (days < 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }

            const countdownNumbers = document.querySelectorAll('.maybi-countdown-section .countdown-number');
            if (countdownNumbers.length >= 4) {
                countdownNumbers[0].textContent = String(days).padStart(2, '0');
                countdownNumbers[1].textContent = String(hours).padStart(2, '0');
                countdownNumbers[2].textContent = String(minutes).padStart(2, '0');
                countdownNumbers[3].textContent = String(seconds).padStart(2, '0');
            }
            
        }, 1000);
    }

    updateCountdown();
}

document.addEventListener('DOMContentLoaded', initCountdown);
