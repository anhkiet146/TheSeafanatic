document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ local storage
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));

  // Lấy tbody của bảng sản phẩm
  let tableBody = document.getElementById("product-table");

  // Kiểm tra xem allProducts có tồn tại hay không
  if (allProducts) {
    // Duyệt qua từng sản phẩm và hiển thị thông tin
    allProducts.forEach(function (product, index) {
      // Tạo một dòng mới
      let newRow = document.createElement("tr");
      newRow.classList.add("info");

      // Tạo các ô dữ liệu cho từng thông tin sản phẩm
      let idCell = document.createElement("td");
      idCell.textContent = product.id;

      let titleCell = document.createElement("td");
      titleCell.textContent = product.title;

      let imgCell = document.createElement("td");
      let imgElement = document.createElement("img");
      imgElement.src = product.imgSrc;
      imgElement.alt = product.title;
      imgElement.style.width = "100px"; // Thêm style để điều chỉnh kích thước hình ảnh
      imgCell.appendChild(imgElement);

      let quantityCell = document.createElement("td");
      quantityCell.textContent = parseInt(product.soluong);

      let soldCell = document.createElement("td");
      soldCell.textContent = parseInt(product.daban);

      let priceCell = document.createElement("td");
      priceCell.textContent = product.price;

      let actionCell = document.createElement("td");

      // Thêm nút chỉnh sửa
      let editButton = document.createElement("a");
      editButton.href = `formEdit.html?id=${product.id}`; // Đường dẫn đến trang chỉnh sửa với tham số id
      let editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-edit", "edit-btn");
      editButton.appendChild(editIcon);
      actionCell.appendChild(editButton);

      // Thêm nút xóa
      // Tạo nút xóa và thêm sự kiện click vào
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
      // Thêm sự kiện vào nút xóa của danh sách sản phẩm
      deleteButton.addEventListener("click", function () {
        // Gọi hàm xóa sản phẩm với id của sản phẩm tương ứng
        deleteProduct(product.id);
        // Loại bỏ hàng khỏi DOM
        tableBody.removeChild(newRow);
      });

      actionCell.appendChild(deleteButton);
      // Thêm các ô dữ liệu vào dòng mới
      newRow.appendChild(idCell);
      newRow.appendChild(titleCell);
      newRow.appendChild(imgCell);
      newRow.appendChild(quantityCell);
      newRow.appendChild(soldCell);
      newRow.appendChild(priceCell);
      newRow.appendChild(actionCell);

      // Thêm dòng mới vào tbody
      tableBody.appendChild(newRow);
    });
  }
});

// Hàm xóa sản phẩm từ localStorage
function deleteProduct(productId) {
  // Lấy dữ liệu từ localStorage
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
  // Tìm vị trí của sản phẩm trong mảng allProducts
  let index = allProducts.findIndex((product) => product.id === productId);
  // Nếu tìm thấy sản phẩm, loại bỏ nó khỏi mảng
  if (index !== -1) {
    allProducts.splice(index, 1);
    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }
}

// Hàm xử lý khi nhấn nút submit
function handleSubmit() {
  // Lấy thông tin sản phẩm từ các trường input
  let masp = parseInt(document.getElementById("masp").value);
  let tensp = document.getElementById("tensp").value;
  let giasp = document.getElementById("giasp").value;
  let soluongsp = document.getElementById("soluongsp").value;
  let srcsp = document.getElementById("srcsp").value;
  // Cắt chuỗi từ phải qua tới dấu /
  let filename = srcsp.substring(srcsp.lastIndexOf("\\") + 1);

  // Lấy dữ liệu từ localStorage
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let newPath = "../data/" + filename;
  // Kiểm tra xem sản phẩm có tồn tại trong allProducts hay không
  let productIndex = allProducts.findIndex((product) => product.id == masp);
  if (productIndex !== -1) {
    // Nếu sản phẩm tồn tại, thay đổi thông tin tương ứng
    allProducts[productIndex].title = tensp;
    allProducts[productIndex].soluong = soluongsp;
    allProducts[productIndex].imgSrc = newPath;
    allProducts[productIndex].price = giasp;

    // Lưu lại dữ liệu đã thay đổi vào localStorage
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    // Thông báo thành công
    alert("Cập nhật sản phẩm thành công!");
  } else {
    // Nếu sản phẩm không tồn tại, thông báo lỗi
    alert("Sản phẩm không tồn tại!");
  }
}
