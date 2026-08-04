// Ngày kết thúc: Năm, Tháng (Tháng 1 = 0, Tháng 8 = 7), Ngày, Giờ, Phút, Giây
const TARGET_DATE = new Date(new Date().getFullYear(), 7, 11, 23, 59, 59).getTime();

function initCountdown() {
    function updateCountdown() {
        function calculateAndUpdate() {
            const now = new Date().getTime();
            const timeDifference = TARGET_DATE - now;

            let days = 0, hours = 0, minutes = 0, seconds = 0;

            if (timeDifference > 0) {
                days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            }

            const countdownNumbers = document.querySelectorAll('.maybi-countdown-section .countdown-number');
            if (countdownNumbers.length >= 4) {
                countdownNumbers[0].textContent = String(days).padStart(2, '0');
                countdownNumbers[1].textContent = String(hours).padStart(2, '0');
                countdownNumbers[2].textContent = String(minutes).padStart(2, '0');
                countdownNumbers[3].textContent = String(seconds).padStart(2, '0');
            }
        }

        calculateAndUpdate();

        setInterval(calculateAndUpdate, 1000);
    }

    updateCountdown();
}

document.addEventListener('DOMContentLoaded', initCountdown);
