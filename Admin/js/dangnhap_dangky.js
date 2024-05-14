$(document).ready(function() {
    $('.eye').click(function() {
        $(this).toggleClass('open')
        $(this).children('i').toggleClass('fa-eye-slash fa-eye')
        if($(this).hasClass('open')) {
            $(this).prev().attr('type', 'text');
        }
        else {
            $(this).prev().attr('type', 'password');
        }
    });
});

function signup() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = {
        username : username,
        email : email,
        password : password,
    }
    var json = JSON.stringify(user);
    localStorage.setItem(username,json);
    alert("Đăng ký thành công");
    window.location.href="dangnhap.html";
}

function login() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if (username == "") {
        alert("Đăng nhập thất bại! Vui lòng nhập tên đăng nhập")
    }
    else if (username == data.username && email == data.email && password == data.password) {
        alert("Đăng nhập thành công");
        window.location.href="dangky.html";
    }
    else {
       alert("Đăng nhập thất bại");
    }
}

// Lắng nghe sự kiện khi nhấn nút "Thêm vào giỏ hàng"
document.querySelector('.add-to-cart').addEventListener('click', function() {
    var productName = document.querySelector('.product-name').innerText;
    var productPrice = document.querySelector('.product-price').innerText;
    var productQuantity = document.querySelector('.product-quantity').value;
    
    // Thực hiện các tác vụ khác
    // Ví dụ: Thêm sản phẩm vào giỏ hàng, tính tổng giá trị đơn hàng, vv.
  });

function checkform() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password2 = document.getElementById("password2");
    if (username.value != "") {
        if (username.value.length < 5) {
            alert("Vui lòng nhập tên nhiều hơn 5 kí tự")
            username.focus();
            return false;
        }
    }
    else {
        alert("Vui lòng nhập tên đăng nhập")
        username.focus();
        return false;
    }
    if (email.value != "") {
        if (email.value.length < 15) {
            alert("Vui lòng nhập email hơn 15 kí tự")
            email.focus();
            return false;
        }
    }
    else {
        alert("Vui lòng nhập email")
        email.focus();
        return false;
    }
    if (password.value != "") {
        if (password.value.length < 10) {
            alert("Vui lòng nhập mật khẩu nhiều hơn 10 kí tự")
            password.focus();
            return false;
        }
    }
    else {
        alert("Mật khẩu không được rỗng! Vui lòng nhập mật khẩu")
        password.focus();
        return false;
    }
    if (password2.value != "" && password.value != "") {
        if (password2.value != password.value) {
            alert("Mật khẩu không trùng khớp! Vui lòng nhập lại")
            password2.focus();
            return false;
        }
    }
    else if (password2.value == "" && password.value != ""){
        alert("Mật khẩu không được rỗng! Vui lòng nhập mật khẩu")
        password2.focus();
        return false;
    }
}

function checkform1() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if(username == 'admin' && email == 'admin@gmail.com' && password == 'adadad') {
        alert("Xin chào admin!");
        window.location.href = "admin.html";
        return false;
    }
    else if (username == "") {
        alert("Đăng nhập thất bại! Vui lòng nhập tên đăng nhập");
        document.getElementById("username").focus();
        return false;  
    }
    else if (username != "") {
        if(!data || username != data.username) {
            alert("Tên đăng nhập không tồn tại! Vui lòng nhập lại");
            document.getElementById("username").focus();
            return false;            
        }
    }
    if (username == data.username && email == data.email && password == data.password) {
        alert("Đăng nhập thành công");
        window.location.href="trangchu.html";
    }
    if (email == "") {
            alert("Đăng nhập thất bại! Vui lòng nhập email");
            document.getElementById("email").focus();
            return false;
    }
    if (email != "") {
        if(email != data.email) {
            alert("Email không hợp lệ! Vui lòng nhập lại");
            document.getElementById("email").focus();
            return false;
        }
    }
    if (password == "") {
            alert("Đăng nhập thất bại! Vui lòng nhập mật khẩu");
            document.getElementById("password").focus();
            return false;
    }
    if (password != "") {
        if(password != data.password) {
            alert("Mật khẩu không đúng! Vui lòng nhập lại");
            document.getElementById("password").focus();
            return false;
        }
    }
}