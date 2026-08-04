const AppMain = (function(){
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9TgRdHzCVF31X1bg4ogwyofKxK0fZ6ClamIJTwYtAopQ3vbFOEwKDI3Kf--xJ9-J2/exec";

    const frmSubmit = document.querySelector("#maybi-registration-form");
    const submitBtn = document.querySelector("#submit-btn");

    frmSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = "Đang gửi...";

        try {
            const formData = new FormData(frmSubmit);

            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Lấy UTM
            const params = new URLSearchParams(window.location.search);

            data.utm_source = params.get("utm_source") || "";
            data.utm_medium = params.get("utm_medium") || "";
            data.utm_campaign = params.get("utm_campaign") || "";
            data.utm_term = params.get("utm_term") || "";
            data.utm_content = params.get("utm_content") || "";

            data.page = window.location.href;
            data.user_agent = navigator.userAgent;
            data.created_at = formatDateTime();

            console.log(data);

            await requestRegister(data,"maybi");

            alert("Đăng ký thành công");

            frmSubmit.reset();

        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "ĐĂNG KÝ NGAY";
        }
    });

    return {
        init: function(){            
        },
    }
})();


async function requestRegister(dataForm, type) {
  const Id =
    "AKfycbzval6fduwlaIyHy36yeMFBynV2rtspaIsGnJl9GOy0tHFQQar455fJ7URCFHoqiMJ7";
  const url = `https://script.google.com/macros/s/${Id}/exec`;

  const payload = JSON.stringify(type ? { type, data: dataForm } : dataForm);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => data);
}

function formatDateTime(date = new Date()) {
    const pad = (n) => String(n).padStart(2, "0");

    return [
        pad(date.getDate()),
        pad(date.getMonth() + 1),
        date.getFullYear()
    ].join("-") + " " +
    [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(":");
}

document.addEventListener("DOMContentLoaded", function (event) {
    AppMain.init();
});