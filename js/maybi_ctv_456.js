const MaybiRegistration = {
  init: function () {
    this.form = document.getElementById("maybi-registration-form");
    this.submitBtn = document.getElementById("submit-btn");

    if (!this.form || !this.submitBtn) return;

    this.bindEvents();
  },

  bindEvents: function () {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  },

  handleSubmit: function (e) {
    const phone = this.form
      .querySelector('[name="so_dien_thoai"]')
      .value.trim();
    const email = this.form.querySelector('[name="email"]').value.trim();

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      alert(
        "Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).",
      );
      e.preventDefault();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập địa chỉ email hợp lệ.");
      e.preventDefault();
      return;
    }

    this.toggleLoadingState(true);
  },

  toggleLoadingState: function (isLoading) {
    if (isLoading) {
      this.submitBtn.textContent = "ĐANG GỬI...";
      this.submitBtn.disabled = true;
      this.submitBtn.style.opacity = "0.7";
    } else {
      this.submitBtn.textContent = "ĐĂNG KÝ NGAY";
      this.submitBtn.disabled = false;
      this.submitBtn.style.opacity = "1";
    }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  MaybiRegistration.init();
});
