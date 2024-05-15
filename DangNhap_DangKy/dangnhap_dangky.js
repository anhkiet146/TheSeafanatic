$(document).ready(function () {
  $(".eye").click(function () {
    $(this).toggleClass("open");
    $(this).children("i").toggleClass("fa-eye-slash fa-eye");
    if ($(this).hasClass("open")) {
      $(this).prev().attr("type", "text");
    } else {
      $(this).prev().attr("type", "password");
    }
  });
});

const defaultUser = {
  username: "admin",
  email: "admin@gmail.com",
  password: "123456789a",
};

var userList = JSON.parse(localStorage.getItem("listuser")) || [];

function signup() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // Tạo một đối tượng user

  var newUser = {
    username: username,
    email: email,
    password: password,
    donhang: [],
    products: [],
  };

  userList.push(newUser);
  localStorage.setItem("listuser", JSON.stringify(userList));

  alert("Đăng ký thành công");
  window.location.href = "dangnhap.html";
}

function login() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var user = localStorage.getItem("user"); // Sử dụng key "user"
  if (user) {
    // Kiểm tra xem giá trị đã tồn tại hay không
    var data = JSON.parse(user);
    if (
      username == "" ||
      username != data.username ||
      email != data.email ||
      password != data.password
    ) {
      alert("Đăng nhập thất bại");
    } else {
      alert("Đăng nhập thành công");
      window.location.href = "../User/nguoidung.html";
    }
  } else {
    alert("Tài khoản không tồn tại");
  }
}

function checkform() {
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var password2 = document.getElementById("password2");
  if (username.value != "") {
    if (username.value.length < 5) {
      alert("Vui lòng nhập tên nhiều hơn 5 kí tự");
      username.focus();
      return false;
    }
  } else {
    alert("Vui lòng nhập tên đăng nhập");
    username.focus();
    return false;
  }
  if (email.value != "") {
    if (email.value.length < 15) {
      alert("Vui lòng nhập email hơn 15 kí tự");
      email.focus();
      return false;
    }
  } else {
    alert("Vui lòng nhập email");
    email.focus();
    return false;
  }
  if (password.value != "") {
    if (password.value.length < 10) {
      alert("Vui lòng nhập mật khẩu nhiều hơn 10 kí tự");
      password.focus();
      return false;
    }
  } else {
    alert("Mật khẩu không được rỗng! Vui lòng nhập mật khẩu");
    password.focus();
    return false;
  }
  if (password2.value != "" && password.value != "") {
    if (password2.value != password.value) {
      alert("Mật khẩu không trùng khớp! Vui lòng nhập lại");
      password2.focus();
      return false;
    }
  } else if (password2.value == "" && password.value != "") {
    alert("Mật khẩu không được rỗng! Vui lòng nhập mật khẩu");
    password2.focus();
    return false;
  }
}

function checkform1() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (
    username === defaultUser.username &&
    email === defaultUser.email &&
    password === defaultUser.password
  ) {
    // Mật khẩu đúng, chuyển hướng đến trang admin
    alert("Chào mừng admin!!!");
    window.location.href = "../Admin/admin.html";
  } else {
    var listuser = JSON.parse(localStorage.getItem("listuser")) || [];
    // Kiểm tra xem danh sách người dùng có dữ liệu hay không
    if (listuser.length === 0) {
      alert(
        "Không tìm thấy thông tin người dùng. Vui lòng đăng ký hoặc kiểm tra lại thông tin đăng nhập."
      );
      return false;
    }

    // Tìm kiếm người dùng trong danh sách
    var checkuser = listuser.find(function (user) {
      return (
        user.username === username &&
        user.email === email &&
        user.password === password
      );
    });

    // Kiểm tra kết quả tìm kiếm
    if (!checkuser) {
      alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.");
      return false;
    }

    var currentUser = {
      username: username,
      email: email,
      password: password,
      donhang: [],
      products: [],
    };

    // Lưu thông tin người dùng vào local storage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Đăng nhập thành công
    alert("Đăng nhập thành công.");
    window.location.href = "../User/nguoidung.html";
  }
}

//Quyet dinh chuyen sang trang chu hay trang nguoi dung
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click trên nút
  let page = document.getElementById("page");
  page.addEventListener("click", function () {
    // Kiểm tra lại dữ liệu trong currentUser sau khi click
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // Nếu có dữ liệu trong currentUser, chuyển hướng đến trang nguoidung.html
      window.location.href = "../User/nguoidung.html";
    } else {
      // Nếu không có dữ liệu trong currentUser, chuyển hướng đến trang trangchu.html
      window.location.href = "../trangchu.html";
    }
  });
});
