const AppMain = (function () {
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzFdYGThWVnZF60_wQwSAlS7R1W0d_loJOPwaCH3qPxFTNLk3f1vmDQxingK80a4O7w-g/exec";

  const frmSubmit = document.querySelector("#maybi-contact-form");
  const submitBtn = document.querySelector("#submit-contact-btn");

  frmSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Đang gửi...</span>";

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

      const response = await requestRegister(data, "maybi");

      if (response && response.result === "success") {
        alert(
          "Gửi thông tin thành công, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!",
        );
        frmSubmit.reset();
      } else {
        console.error("Lỗi từ Google Script:", response);
        alert("Gửi thông tin thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>GỬI THÔNG TIN</span>";
    }
  });

  return {
    init: function () {},
  };
})();

async function requestRegister(dataForm, type) {
  const Id =
    "AKfycbzFdYGThWVnZF60_wQwSAlS7R1W0d_loJOPwaCH3qPxFTNLk3f1vmDQxingK80a4O7w-g";
  const url = `https://script.google.com/macros/s/${Id}/exec`;

  // Chuẩn bị dữ liệu để gửi đi
  const formData = new URLSearchParams();
  formData.append("type", type);
  for (const key in dataForm) {
    formData.append(key, dataForm[key]);
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data);
}

function formatDateTime(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join(
      "-",
    ) +
    " " +
    [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(
      ":",
    )
  );
}

document.addEventListener("DOMContentLoaded", function (event) {
  AppMain.init();
});
