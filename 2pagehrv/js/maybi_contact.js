const MaybiContact = (function () {
  let form;
  let submitBtn;

  function validateForm() {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const hoTen = form.querySelector('[name="ho_ten"]').value.trim();
      const phone = form.querySelector('[name="so_dien_thoai"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const chuDe = form.querySelector('[name="chu_de"]').value;
      const noiDung = form.querySelector('[name="noi_dung"]').value.trim();

      if (!hoTen) {
        alert("Vui lòng nhập họ và tên của bạn.");
        return;
      }

      const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
      if (!nameRegex.test(hoTen)) {
        alert("Họ và tên chỉ được chứa chữ cái, không được chứa số hoặc ký tự đặc biệt.");
        return;
      }

      const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
      if (!phoneRegex.test(phone)) {
        alert("Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return;
      }

      if (chuDe === "0") {
        alert("Vui lòng chọn chủ đề bạn cần hỗ trợ.");
        return;
      }

      if (!noiDung) {
        alert("Vui lòng nhập nội dung bạn cần hỗ trợ.");
        return;
      }

      const btnText = submitBtn.querySelector('span');
      if (btnText) btnText.textContent = "ĐANG GỬI...";
      else submitBtn.textContent = "ĐANG GỬI...";
      
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.style.cursor = "not-allowed";

    });
  }

  return {
    init: function () {
      form = document.getElementById("maybi-contact-form");
      submitBtn = document.getElementById("submit-contact-btn");

      if (!form || !submitBtn) return;

      validateForm();
    },
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  MaybiContact.init();
});
