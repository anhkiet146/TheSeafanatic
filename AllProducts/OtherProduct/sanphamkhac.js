document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra xem dữ liệu currentUser đã tồn tại trong localStorage chưa
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let loginButton = document.getElementById("loginButton");
  let userDropdown = document.getElementById("userDropdown");

  if (currentUser) {
    // Ẩn nút loginButton
    loginButton.style.display = "none";

    let username = currentUser.username; // Thay "username" bằng key chứa thông tin về username trong object currentUser

    // Lấy danh sách các <li> trong <ul>
    let navbarList = document.querySelector(".navbar .list");
    let existingLi = navbarList.querySelector("li");

    // Chỉ thêm <li> mới nếu chưa có <li> nào trong <ul>
    if (!existingLi) {
      // Tạo một <li> mới
      let newListItem = document.createElement("li");
      newListItem.classList.add("dropdown");

      // Tạo nội dung của <li> mới
      newListItem.innerHTML =
        `
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"><i class="fa fa-user"></i></a>
            <ul class="dropdown-menu">
                <li><a id="username" class="dropdown-item" href="#">` +
        username +
        `</a></li>
        <li><a id="logout" onclick="handleLogout()" style="cursor: pointer;" class="dropdown-item">Log out</a></li>
            </ul>
        `;

      // Chèn <li> mới vào danh sách <ul>
      navbarList.appendChild(newListItem);

      // Lấy element dropdown-toggle để kích hoạt dropdown menu khi được nhấp
      let dropdownToggle = newListItem.querySelector(".dropdown-toggle");
      // Kích hoạt dropdown menu bằng cách gọi hàm bootstrap để khởi tạo
      new bootstrap.Dropdown(dropdownToggle);
    }

    // Lấy thông tin người dùng từ Local Storage
  } else {
    userDropdown.style.display = "none";
  }
});

//Quyet dinh chuyen sang trang chu hay trang nguoi dung
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click trên nút
  let page = document.getElementById("page");
  page.addEventListener("click", function () {
    // Kiểm tra lại dữ liệu trong currentUser sau khi click
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // Nếu có dữ liệu trong currentUser, chuyển hướng đến trang nguoidung.html
      window.location.href = "../../../User/nguoidung.html";
    } else {
      // Nếu không có dữ liệu trong currentUser, chuyển hướng đến trang trangchu.html
      window.location.href = "../../../trangchu.html";
    }
  });
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  updateCartCount(); // Update cart count when the page loads
}

// ============= UPDATE CART COUNT ===========
function updateCartCount() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let cartCount = 0;
  if (currentUser && currentUser.products) {
    cartCount = currentUser.products.length;
  }

  // Update the cart count message on the button
  let cartButton = document.querySelector("#count");
  if (cartButton) {
    cartButton.innerHTML = `${cartCount}`;
  }
}

var addToCartButtons = document.querySelector(".button");
addToCartButtons.addEventListener("click", handle_addCartItem);

function handle_addCartItem(event) {
  // Kiểm tra xem có người dùng đăng nhập hay không
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    window.location.href = "DangNhap_DangKy/dangnhap.html";
  }

  let addToCartButton = event.target; // Lấy phần tử button được click
  let card = addToCartButton.closest(".row"); // Tìm thẻ cha có class là 'col'
  let title = card.querySelector(".product-name").innerHTML;
  let price = card.querySelector(".product-price").innerHTML;
  let imgSrc = card.querySelector(".group-box").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // Kiểm tra xem sản phẩm đã tồn tại trong danh sách sản phẩm chưa
  if (user.products.find((item) => item.title === newToAdd.title)) {
    alert("Sản phẩm đã tồn tại trong giỏ hàng!");
    return;
  } else {
    // Thêm sản phẩm vào danh sách sản phẩm trong Local Storage
    user.products.push(newToAdd);
    // Lưu danh sách sản phẩm vào local storage
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đã thêm vào giỏ hàng!!!");
    updateListUser(user);
  }
  updateCartCount();
}

function updateListUser(currentUser) {
  // Get listUser from localStorage
  let listUser = JSON.parse(localStorage.getItem("listuser"));
  console.log(listUser);
  console.log(currentUser);
  // Find the index of currentUser in listUser
  let index = listUser.findIndex(
    (user) => user.username === currentUser.username
  );

  // If currentUser is found in listUser, update its data
  if (index !== -1) {
    listUser[index] = currentUser;
    // Save updated listUser back to localStorage
    localStorage.setItem("listuser", JSON.stringify(listUser));
  }
}

// Xử lý sự kiện khi người dùng bấm vào nút logout
function handleLogout() {
  // Lấy dữ liệu người dùng từ localStorage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let listUser = JSON.parse(localStorage.getItem("listuser"));

  // Xác định người dùng cần được cập nhật trong listUser
  let usertitle = currentUser.username; // Giả sử email là trường duy nhất xác định người dùng

  // Tìm người dùng trong listUser
  let userToUpdateIndex = listUser.findIndex(
    (user) => user.username === usertitle
  );

  // Nếu người dùng được tìm thấy trong listUser
  if (userToUpdateIndex !== -1) {
    // Cập nhật dữ liệu của người dùng đó với dữ liệu từ currentUser
    listUser[userToUpdateIndex] = currentUser;

    // Lưu listUser được cập nhật vào localStorage
    localStorage.setItem("listuser", JSON.stringify(listUser));

    console.log("Đã cập nhật dữ liệu của currentUser vào listUser");
  } else {
    console.log("Không thể tìm thấy người dùng trong listUser");
  }

  // Xóa dữ liệu của currentUser từ localStorage và chuyển người dùng đến trang đăng nhập hoặc trang chính
  localStorage.removeItem("currentUser");
  window.location.href = "../../../DangNhap_DangKy/dangnhap.html"; // Đổi thành trang đăng nhập của bạn
}
function ca() {
  alert("Mặt hàng này đã hết! Xin quý khách vui lòng chọn mặt hàng khác");
  return false;
}
