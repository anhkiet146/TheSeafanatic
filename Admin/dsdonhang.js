// Lấy dữ liệu từ localStorage
let listUser = JSON.parse(localStorage.getItem("listuser"));
let orderTableBody = document.getElementById("content-table");
let orderCount = 0;

// Kiểm tra xem listUser có dữ liệu không
if (listUser && listUser.length > 0) {
  // Duyệt qua mỗi người dùng trong listUser
  listUser.forEach((user, userIndex) => {
    // Duyệt qua mỗi đơn hàng của người dùng
    user.donhang.forEach((order, orderIndex) => {
      // Tạo một dòng mới trong bảng đơn hàng
      let newRow = orderTableBody.insertRow();

      // Tạo các ô trong dòng mới
      let orderIdCell = newRow.insertCell();
      let usernameCell = newRow.insertCell();
      let totalPriceCell = newRow.insertCell();
      let dateCell = newRow.insertCell();
      let detailCell = newRow.insertCell();
      let confirmCell = newRow.insertCell();
      let deleteCell = newRow.insertCell();

      // Đặt giá trị cho các ô
      orderIdCell.innerText = ++orderCount;
      usernameCell.innerText = user.username;
      totalPriceCell.innerText = order.tongtien;
      dateCell.innerText = order.ngaymua;
      detailCell.innerHTML = `<button class="chitiet" onclick="showOrderDetail(${userIndex}, ${orderIndex})">Chi tiết</button>`;
      confirmCell.innerHTML = `<input type="radio" class="xacnhan" onclick="confirmOrder(${userIndex}, ${orderIndex})"></input>`;
      deleteCell.innerHTML = `<button id="order-${userIndex}-${orderIndex}" class="delete-button" onclick="deleteOrder(${userIndex}, ${orderIndex})"><i class="fa fa-trash-alt delete-icon"></i></button>`;
    });
  });
} else {
  // Hiển thị thông báo nếu không có dữ liệu
  orderTableBody.innerHTML =
    "<tr><td colspan='7'>Không có đơn hàng nào.</td></tr>";
}

// Hàm hiển thị chi tiết đơn hàng
function showOrderDetail(userIndex, orderIndex) {
  // Lấy dữ liệu đơn hàng từ listUser
  let order = listUser[userIndex].donhang[orderIndex];

  // Tạo một div để hiển thị chi tiết đơn hàng
  let detailDiv = document.createElement("div");
  detailDiv.classList.add("order-detail");

  // Tạo tiêu đề
  let title = document.createElement("h2");
  title.innerText = `Chi tiết đơn hàng`;
  detailDiv.appendChild(title);

  let closeButton = document.createElement("button");
  closeButton.innerText = "Đóng";
  closeButton.classList.add("close-btn");
  closeButton.addEventListener("click", function () {
    document.body.removeChild(detailDiv);
  });
  detailDiv.appendChild(closeButton);

  // Duyệt qua từng sản phẩm trong đơn hàng
  order.sp.forEach((product, index) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Hiển thị thông tin sản phẩm
    let productName = document.createElement("h5");
    productName.innerText = `Sản phẩm ${index + 1}: ${product.title}`;
    productDiv.appendChild(productName);

    let productPrice = document.createElement("p");
    productPrice.innerText = `Giá: ${product.price}`;
    productDiv.appendChild(productPrice);

    let productImage = document.createElement("img");
    productImage.src = product.imgSrc;
    productImage.alt = "Product Image";
    productImage.style.width = "100px";
    productDiv.appendChild(productImage);

    // Thêm sản phẩm vào div chi tiết đơn hàng
    detailDiv.appendChild(productDiv);
  });

  // Thêm div chi tiết đơn hàng vào body
  document.body.appendChild(detailDiv);
}

// Hàm xóa đơn hàng
function deleteOrder(userIndex, orderIndex) {
  // Lấy danh sách người dùng từ localStorage
  let listUser = JSON.parse(localStorage.getItem("listuser"));

  // Kiểm tra xem userIndex và orderIndex có hợp lệ không
  if (
    userIndex >= 0 &&
    userIndex < listUser.length &&
    orderIndex >= 0 &&
    orderIndex < listUser[userIndex].donhang.length
  ) {
    // Xóa đơn hàng khỏi danh sách donhang của người dùng tương ứng
    listUser[userIndex].donhang.splice(orderIndex, 1);

    // Lưu danh sách người dùng đã cập nhật vào localStorage
    localStorage.setItem("listuser", JSON.stringify(listUser));

    // Hiển thị thông báo hoặc thực hiện các thao tác khác sau khi xóa thành công
    alert("Đơn hàng đã được xóa thành công!");
    location.reload();
    // Cập nhật lại giao diện hiển thị danh sách đơn hàng nếu cần
    // Ví dụ: render lại bảng đơn hàng sau khi xóa
    renderOrderTable();

    // Tìm và xóa hàng trong bảng hiển thị
    let tableRow = document.getElementById(`order-${userIndex}-${orderIndex}`);
    if (tableRow) {
      tableRow.remove(); // Loại bỏ hàng khỏi DOM
    }
  } else {
    alert("Không thể xóa đơn hàng. Vui lòng thử lại!");
  }
}
