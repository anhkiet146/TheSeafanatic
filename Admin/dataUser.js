// Lấy dữ liệu từ localStorage
let listuser = JSON.parse(localStorage.getItem("listuser"));

// Kiểm tra xem listuser có dữ liệu hay không
if (listuser && listuser.length > 0) {
  // Lặp qua mỗi đối tượng người dùng trong listuser và hiển thị thông tin
  listuser.forEach((user, index) => {
    // Tạo phần tử <tr> để chứa thông tin của mỗi người dùng
    let userRow = document.createElement("tr");
    userRow.classList.add("infor");

    // Tạo các cột thông tin
    let sttCol = document.createElement("td");
    sttCol.textContent = index + 1;

    let usernameCol = document.createElement("td");
    usernameCol.textContent = user.username;

    let emailCol = document.createElement("td");
    emailCol.textContent = user.email;

    let statusCol = document.createElement("td");
    statusCol.textContent = user.status;

    let deleteButton = document.createElement("button");

    // Thêm icon từ Font Awesome vào nút xóa
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt"); // Sử dụng class của Font Awesome để chọn icon
    deleteButton.appendChild(deleteIcon); // Thêm icon vào nút xóa
    deleteButton.classList.add("delete-button");
    deleteIcon.classList.add("delete-icon");
    // Xử lý sự kiện khi người dùng nhấn vào nút xóa
    deleteButton.addEventListener("click", () => {
      // Xóa người dùng khỏi listuser
      listuser.splice(index, 1);
      // Lưu trữ lại listuser vào localStorage
      localStorage.setItem("listuser", JSON.stringify(listuser));
      // Xóa hàng người dùng khỏi bảng
      userRow.remove();
    });

    // Tạo cột cho nút xóa
    let deleteCol = document.createElement("td");
    deleteCol.appendChild(deleteButton);

    // Thêm các cột vào hàng người dùng
    userRow.appendChild(sttCol);
    userRow.appendChild(usernameCol);
    userRow.appendChild(emailCol);
    userRow.appendChild(statusCol);
    userRow.appendChild(deleteCol);

    // Thêm hàng người dùng vào bảng
    document.getElementById("userList").appendChild(userRow);
  });
}
