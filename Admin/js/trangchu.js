$(document).ready(function () {
  $(".slider1").slick({
    infinity: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow:
      '<span id="left" class"prev_arrow><i class="fas fa-angle-left"></i></span>',
    nextArrow:
      '<span id="right" class"next_arrow><i class="fas fa-angle-right"></i></span>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});


const addcart = document.getElementById()

function soldout() {
  alert("Mặt hàng này đã hết! Xin quý khách vui lòng chọn mặt hàng khác");
  return false;
}