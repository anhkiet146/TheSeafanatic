// Lấy dữ liệu từ localStorage
let listUser = JSON.parse(localStorage.getItem("listuser"));
let totalValue = 0;

// Kiểm tra xem listUser có dữ liệu không
if (listUser && listUser.length > 0) {
  // Duyệt qua mỗi người dùng trong listUser
  listUser.forEach((user) => {
    // Duyệt qua mỗi đơn hàng của người dùng
    user.donhang.forEach((order) => {
      // Chuyển đổi tổng tiền từ chuỗi sang số
      let orderTotal = parseFloat(order.tongtien.replace(/\D/g, ""));
      // Nếu muốn loại bỏ cả ký tự 'VND'
      // let orderTotal = parseFloat(order.tongtien.replace(/\D/g, '')) / 1000;
      totalValue += orderTotal;
    });
  });
}

// Hiển thị tổng tiền vào thẻ <h3 class="value">
let totalValueElement = document.querySelector(".value1");
if (totalValueElement) {
  totalValueElement.textContent = `${totalValue}`;
}

// Hàm đếm số đơn hàng
function countOrders() {
  let orderCount = 0;

  // Lấy dữ liệu từ localStorage
  let listUser = JSON.parse(localStorage.getItem("listuser"));

  // Kiểm tra xem listUser có dữ liệu không
  if (listUser && listUser.length > 0) {
    // Duyệt qua mỗi người dùng trong listUser
    listUser.forEach((user) => {
      // Duyệt qua mỗi đơn hàng của người dùng
      orderCount += user.donhang.length;
    });
  }

  return orderCount;
}

// Hiển thị số đơn hàng trên thẻ <h3 class="value1">
function updateOrderCount() {
  let orderCount = countOrders();
  let orderCountElement = document.querySelector(".value2");
  if (orderCountElement) {
    orderCountElement.textContent = `${orderCount}`;
  }
}

// Gọi hàm cập nhật số đơn hàng khi trang được tải
window.addEventListener("load", updateOrderCount);

// Cập nhật số đơn hàng sau khi thực hiện các thao tác liên quan đến đơn hàng
function updateOrderCountAfterAction() {
  updateOrderCount();
}

document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ localStorage
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));

  // Hiển thị số lượng sản phẩm đã có sẵn
  let value3Element = document.querySelector(".value3");
  if (allProducts && allProducts.length > 0) {
    value3Element.textContent = `${allProducts.length}`;
  }
});
