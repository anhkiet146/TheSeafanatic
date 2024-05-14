// Danh sách sản phẩm
let allProducts = [
  {
    id: 1010013,
    title: "Cua King Grab Xanh",
    price: "2,390,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua King Crab Xanh.jpg",
  },
  {
    id: 1010118,
    title: "Ghẹ Xanh Sống",
    price: "275,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Ghẹ Xanh Sống.jpg",
  },
  {
    id: 1010019,
    title: "Cua Thịt Cà Mau Sống",
    price: "215,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua Thịt Cà Mau Sống.webp",
  },
  {
    id: 1010012,
    title: "Cua Hoàng Đế",
    price: "2,690,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua Hoàng Đế.jpg",
  },
  {
    id: 1010014,
    title: "Cua Nâu Sống",
    price: "552,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua Nâu Sống.webp",
  },
  {
    id: 1010020,
    title: "Cua Gạch Cà Mau",
    price: "276,500đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua Gạch Cà Mau.webp",
  },
  {
    id: 1010106,
    title: "Cua Tuyết Sống",
    price: "1,890,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Cua Tuyết Sống.webp",
  },
  {
    id: 1070002,
    title: "Tôm Hùng Alaska Nhỏ",
    price: "745,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Tôm Hùng Alaska Nhỏ.jpg",
  },
  {
    id: 1010046,
    title: "Tôm Hùng Alaska Sống Lớn",
    price: "1,690,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Tôm Hùng Alaska Sống Lớn.webp",
  },
  {
    id: 1010045,
    title: "Tôm Càng Xanh Sống",
    price: "319,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Tôm Càng Xanh Sống.jpg",
  },
  {
    id: 1010098,
    title: "Tôm Hùm Xanh Sống",
    price: "529,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Tôm Hùm Xanh Sống.jpg",
  },
  {
    id: 101010123,
    title: "Bọ Biển",
    price: "925,000đ/1con",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/Bọ Biển Sống.webp",
  },
  {
    id: 101010094,
    title: "Ốc Xà Cừ",
    price: "750,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/[550x550-cr]oc-xa-cu--24.jpg",
  },
  {
    id: 1040051,
    title: "Mực Sống",
    price: "360,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/[550x550-cr]muc-ong-86.jpg",
  },
  {
    id: 1040096,
    title: "Bạch Tuộc",
    price: "350,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/bach tuoc.webp",
  },
  {
    id: 1010070,
    title: "Cá Ngừ Đại Dương",
    price: "155,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/ca ngu.png",
  },
  {
    id: 1010071,
    title: "Cá Thu",
    price: "150,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/ca_thu_9a37157d653f4ba19956f561d7dd90dd_grande.jpg",
  },
  {
    id: 1070015,
    title: "Hàu Tươi Sống",
    price: "50,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/cach-che-bien-hau-1.jpg",
  },
  {
    id: 1010072,
    title: "Cá Mặt Quỷ",
    price: "1,550,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/mq-ch.jpg",
  },
  {
    id: 101010095,
    title: "Ốc Tỏi",
    price: "250,000đ/1kg",
    soluong: 200,
    daban: 180,
    imgSrc: "../data/oc-toi.jpg",
  },
];

// Lưu mảng allProducts vào localStorage
localStorage.setItem("allProducts", JSON.stringify(allProducts));

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
  window.location.href = "DangNhap_DangKy/dangnhap.html"; // Đổi thành trang đăng nhập của bạn
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  updateCartCount(); // Update cart count when the page loads
  // displayUsername();
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

var addToCartButtons = document.querySelectorAll(".addToCartButton");
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", handle_addCartItem);
});

function handle_addCartItem(event) {
  // Kiểm tra xem có người dùng đăng nhập hay không
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    window.location.href = "../DangNhap_DangKy/dangnhap.html";
  }

  let addToCartButton = event.target; // Lấy phần tử button được click
  let card = addToCartButton.closest(".sanPham");
  let title = card.querySelector(".title").innerHTML;
  let price = card.querySelector(".price").innerHTML;
  let imgSrc = card.querySelector(".card-img-top").src;
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

var search_terms = [
  "Cua King Grab Xanh",
  "Ghẹ Xanh Sống",
  "Cua Thịt Cà Mau Sống",
  "Cua Hoàng Đế",
  "Cua Nâu Sống",
  "Cua Gạch Cà Mau",
  "Cua Tuyết Sống",
  "Tôm Hùng Alaska Nhỏ",
  "Tôm Hùng Alaska Sống Lớn",
  "Tôm Càng Xanh Sống",
  "Tôm Hùm Xanh Sống",
  "Bọ Biển",
  "Ốc Xà Cừ",
  "Mực Sống",
  "Bạch Tuộc",
  "Cá Ngừ Đại Dương",
  "Cá Thu",
  "Hàu Tươi Sống",
  "Cá Mặt Qủy",
  "Ốc Tỏi",
];

const resultBox = document.getElementById("result");
const inputBox = document.getElementById("searchInput");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = search_terms.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    console.log(result);
  }
  display(result);

  if (!result.length) {
    resultBox.innerHTML = "";
  }
};

function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });

  resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
}

document.getElementById("searchButton").addEventListener("click", function () {
  event.preventDefault();
  var searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  var products = JSON.parse(localStorage.getItem("allProducts"));
  var searchResults = [];

  if (!products || !Array.isArray(products)) {
    alert("Không có sản phẩm nào trong cơ sở dữ liệu.");
    return;
  }

  // Tìm kiếm trong danh sách sản phẩm
  products.forEach(function (product) {
    if (product.title.toLowerCase().includes(searchInput)) {
      searchResults.push(product);
    }
  });

  // Hiển thị kết quả tìm kiếm
  displaySearchResults(searchResults);
});

function displaySearchResults(results) {
  var searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  if (results.length === 0) {
    searchResultsContainer.textContent = "Không có kết quả tìm kiếm.";
    return;
  }

  var ul = document.createElement("ul");
  results.forEach(function (product) {
    var productElement = document.createElement("div");
    productElement.classList.add("sanPham");

    // Hiển thị thông tin của sản phẩm
    productElement.innerHTML = `
            <div id="searchid">${product.id}</div>
            <div class="title">${product.title}</div>
            <div class="price">${product.price}</div>
            <img class="card-img-top" src="${product.imgSrc}" style="width:170px" alt="${product.tile}">
            <button class="button-searched" onclick="handle_addCartItem(event)">Add Cart</button>
        `;

    searchResultsContainer.appendChild(productElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ localStorage
  var searchResults = JSON.parse(localStorage.getItem("searchInfo"));

  // Hiển thị dữ liệu từ searchInfo
  displaySearchResults(searchResults);

  // Xóa dữ liệu trong searchInfo sau khi hiển thị
  localStorage.removeItem("searchInfo");
});

function displaySearchResults(results) {
  var searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  results.forEach(function (product) {
    var productElement = document.createElement("div");
    productElement.classList.add("sanPham");

    // Hiển thị thông tin của sản phẩm
    productElement.innerHTML = `
      <div id="searchid">${product.id}</div>
      <div class="title">${product.title}</div>
      <div class="price">${product.price}</div>
      <img class="card-img-top" src="${product.imgSrc}" style="width:170px" alt="${product.tile}">
      <button class="button-searched" onclick="handle_addCartItem(event)">Add Cart</button>
    `;

    searchResultsContainer.appendChild(productElement);
  });
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

//Quyet dinh chuyen sang trang chu hay trang nguoi dung
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click trên nút
  let page = document.getElementById("page");
  page.addEventListener("click", function () {
    // Kiểm tra lại dữ liệu trong currentUser sau khi click
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // Nếu có dữ liệu trong currentUser, chuyển hướng đến trang nguoidung.html
      window.location.href = "../nguoidung.html";
    } else {
      // Nếu không có dữ liệu trong currentUser, chuyển hướng đến trang trangchu.html
      window.location.href = "../trangchu.html";
    }
  });
});
