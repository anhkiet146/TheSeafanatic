// Hàm xử lý khi nhấn nút "Thêm sản phẩm"
function handleAddProduct() {
  // Lấy thông tin sản phẩm từ các trường input
  let masp = document.getElementById("masp").value;
  let soluongsp = document.getElementById("soluongsp").value;
  let srcsp = document.getElementById("srcsp").value;
  // Cắt chuỗi từ phải qua tới dấu /
  let filename = srcsp.substring(srcsp.lastIndexOf("\\") + 1);

  // Thêm path mới vào trước chuỗi đã cắt
  let newPath = "../data/" + filename;

  let tensp = document.getElementById("tensp").value;
  let giasp = document.getElementById("giasp").value;

  // Lấy dữ liệu từ localStorage
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

  // Kiểm tra xem sản phẩm có tồn tại trong allProducts hay không
  let existingProduct = allProducts.find((product) => product.id === masp);
  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, thông báo lỗi
    alert("Sản phẩm đã tồn tại!");
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm vào mảng allProducts
    let newProduct = {
      id: masp,
      soluong: soluongsp,
      imgSrc: newPath,
      title: tensp,
      price: giasp,
      daban: 0,
    };

    allProducts.push(newProduct);

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    // Thông báo thành công
    alert("Sản phẩm đã được thêm vào danh sách!");
  }
}
