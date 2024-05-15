// Mở & Đóng Giỏ Hàng
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
  loadCartItems(); // Load cart items from localStorage
  updateTotal(); // Update total price
  updateCartCount();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
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

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============

function handle_addCartItem() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    window.location.href = "../dangnhap.html";
  }

  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  if (user.products.find((item) => item.title === newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    // Thêm sản phẩm vào danh sách sản phẩm trong giỏ hàng
    user.products.push(newToAdd);
    // Lưu danh sách sản phẩm vào local storage
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateListUser(user);
  }
  updateCartCount();

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
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

function handle_removeCartItem() {
  // Lấy ra tên sản phẩm cần xóa
  const productName = this.parentElement.querySelector(
    ".cart-product-title"
  ).innerHTML;

  // Lấy danh sách sản phẩm từ local storage
  let user = JSON.parse(localStorage.getItem("currentUser"));

  // Lọc ra các sản phẩm không có tên giống với productName
  const updatedProducts = user.products.filter(
    (item) => item.title !== productName
  );

  // Cập nhật lại thuộc tính products của user với danh sách sản phẩm đã được lọc
  user.products = updatedProducts;

  // Cập nhật lại local storage
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateListUser(user);

  // Xóa phần tử trên giao diện
  this.parentElement.remove();

  // Cập nhật lại tổng tiền
  update();
  updateCartCount();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  // Lấy dữ liệu người dùng từ localStorage
  let user = JSON.parse(localStorage.getItem("currentUser"));

  // Tạo mảng đơn hàng mới
  let donhang = [];
  const totalElement = document.querySelector(".total-price");
  const totalprice = totalElement.innerText;

  // Lặp qua mảng sản phẩm của người dùng và thêm vào mảng đơn hàng mới
  user.products.forEach((product, index) => {
    // Lấy số lượng từ ô input
    let quantityInput = document.querySelectorAll(".cart-quantity")[index]; // Lấy ô input ứng với sản phẩm hiện tại
    let quantity = parseInt(quantityInput.value); // Lấy giá trị số lượng từ ô input và chuyển đổi thành số nguyên
    // Tạo đối tượng đơn hàng cho mỗi sản phẩm
    let item = {
      title: product.title,
      price: product.price,
      imgSrc: product.imgSrc,
      soluong: quantity,
    };
    donhang.push(item);
  });

  // Thêm thông tin đơn hàng vào đối tượng người dùng
  user.donhang.push({
    sp: donhang,
    ngaymua: new Date().toISOString(), // Lấy thời gian hiện tại khi đặt hàng
    tinhTrang: "Đang chờ xử lý",
    tongtien: totalprice,
  });

  // Cập nhật lại dữ liệu của người dùng trong localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateListUser(user);
  // Xóa toàn bộ dữ liệu trong mảng products
  user.products = [];
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateListUser(user);

  // Hiển thị thông báo và làm mới trang nếu cần
  alert("Đơn hàng của bạn đã được đặt thành công!");
  location.reload(); // Làm mới trang sau khi đặt hàng thành công
}

// Load cart items from localStorage
function loadCartItems() {
  // Đọc dữ liệu từ local storage
  var user = JSON.parse(localStorage.getItem("currentUser"));
  // Hiển thị dữ liệu trên trang
  var cartContent = document.querySelector(".cart-content");

  if (user.products.length > 0) {
    user.products.forEach(function (item) {
      // Tạo phần tử cart box từ dữ liệu của mỗi sản phẩm trong giỏ hàng
      var cartBoxElement = CartBoxComponent(
        item.title,
        item.price,
        item.imgSrc
      );
      // Thêm cart box vào DOM
      cartContent.innerHTML += cartBoxElement;
    });
    update();
  }
}

// =========== CẬP NHẬT & RERENDER FUNCTIONS =========
function formatPrice(price) {
  return price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(
      priceElement.innerHTML.replace("$", "").replace(/,/g, "")
    );
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  let formattedTotal = formatPrice(total) + " VND";
  totalElement.innerHTML = formattedTotal;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  let formattedPrice = formatPrice(parseFloat(price.replace("$", "")));
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra xem dữ liệu currentUser đã tồn tại trong localStorage chưa
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let loginButton = document.getElementById("loginButton");
  let userDropdown = document.getElementById("userDropdown");

  if (currentUser) {
    // Ẩn nút loginButton
    loginButton.style.display = "none";

    let usernameElement = currentUser.username; // Thay "username" bằng key chứa thông tin về username trong object currentUser

    // Tạo một <li> mới
    let newListItem = document.createElement("li");
    newListItem.classList.add("dropdown");

    // Tạo nội dung của <li> mới
    newListItem.innerHTML =
      `
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"><i class="fa fa-user"></i></a>
          <ul class="dropdown-menu">
              <li><a id="username" class="dropdown-item" href="#">` +
      usernameElement +
      `</a></li>
      <li><a id="logout" onclick="handleLogout()" style="cursor: pointer;" class="dropdown-item">Log out</a></li>
          </ul>
      `;

    // Chèn <li> mới vào danh sách <ul>
    let navbarList = document.querySelector(".navbar .list");
    navbarList.appendChild(newListItem);

    // Lấy element dropdown-toggle để kích hoạt dropdown menu khi được nhấp
    let dropdownToggle = newListItem.querySelector(".dropdown-toggle");
    // Kích hoạt dropdown menu bằng cách gọi hàm bootstrap để khởi tạo
    new bootstrap.Dropdown(dropdownToggle);

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
      window.location.href = "../User/nguoidung.html";
    } else {
      // Nếu không có dữ liệu trong currentUser, chuyển hướng đến trang trangchu.html
      window.location.href = "../trangchu.html";
    }
  });
});

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
