$(document).ready(function () {
  $(".form_search").submit(function (event) {
    $(".searched-products").html(""); // Xóa sản phẩm cũ đi tránh thêm vào bị lặp
    event.preventDefault();
    var searchTerm = $("#search-input").val().toLowerCase(); //Lấy giá trị của input
    $(".product").each(function () {
      //Lặp qua các product
      var productName = $(this).find(".product-name").text().toLowerCase();
      if (productName.includes(searchTerm)) {
        // tên product có chứa search iteam không

        $("#searched-products").addClass("show"); //div chứa id này sẽ được show
        // this: sản phẩn hiện tại đang lặp qua
        // appendTo: thêm html của sản phẩm vào class .searched-products
        $(this).clone().appendTo($(".searched-products")).show();
      }
    });
  });
});
// Khi enter input thì chạy vào hàm này
$(".form_search").keypress(function (e) {
  if (e.which == 13) {
    // 13 là enter
    $("#search").click(); //tìm đến id tên search và tự click vào đấy
  }
});

$(".loai-category").on("click", function (event) {
  event.preventDefault();
  $(".fill-products").empty(); // Xóa các sản phẩm đã từng lọc trước đó tránh lặp lại
  var category = $(this).find("span").text().toLowerCase(); //this: loại sản phẩm hiện tại -> span -> text bên trong
  $(".product").each(function () {
    // this div sản phẩm hiện tại -> div class fillter -> text ===category
    // ví dụ áo phông abc=== 'áo phông ' thì thêm this vào .fill-products
    if ($(this).find(".fillter").text().toLowerCase() === category) {
      $("#fill-products").addClass("show");
      $(this).clone().appendTo($(".fill-products")).show();
    }
  });
});

jQuery(document).ready(function () {
  var show_per_page = 5;
  var number_of_items = $("#pop1 .product").length;
  var number_of_pages = Math.ceil(number_of_items / show_per_page);

  //set the value of our hidden input fields
  $("#current_page").val(0);
  $("#show_per_page").val(show_per_page);

  //now when we got all we need for the navigation let's make it '

  /* 
	what are we going to have in the navigation?
		- link to previous page
		- links to specific pages
		- link to next page
	*/
  var navigation_html =
    '<a class="previous_link" href="javascript:previous();">&laquo;</a>';
  var current_link = 0;
  while (number_of_pages > current_link) {
    navigation_html +=
      '<a class="page_link" href="javascript:go_to_page(' +
      current_link +
      ')" longdesc="' +
      current_link +
      '">' +
      (current_link + 1) +
      "</a>";
    current_link++;
  }
  navigation_html +=
    '<a class="next_link" href="javascript:next();">&raquo;</a>';

  $("#page_navigation").html(navigation_html);

  //add active_page class to the first page link
  $("#page_navigation .page_link:first").addClass("active_page");

  //hide all the elements inside div
  $("#pop1 .product").css("display", "none");

  //and show the first n (show_per_page) elements
  $("#pop1 .product").slice(0, show_per_page).css("display", "block");
  check_navigation_buttons();
});

function previous() {
  new_page = parseInt($("#current_page").val()) - 1;
  //if there is an item before the current active link run the function
  if ($(".active_page").prev(".page_link").length == true) {
    go_to_page(new_page);
  }
  check_navigation_buttons();
}

function next() {
  new_page = parseInt($("#current_page").val()) + 1;
  //if there is an item after the current active link run the function
  if ($(".active_page").next(".page_link").length == true) {
    go_to_page(new_page);
  }
  check_navigation_buttons();
}
function go_to_page(page_num) {
  //get the number of items shown per page
  var show_per_page = parseInt($("#show_per_page").val());

  //get the element number where to start the slice from
  start_from = page_num * show_per_page;

  //get the element number where to end the slice
  end_on = start_from + show_per_page;

  //hide all children elements of div, get specific items and show them
  $("#pop1 .product")
    .css("display", "none")
    .slice(start_from, end_on)
    .css("display", "block");

  /*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
  $(".page_link[longdesc=" + page_num + "]")
    .addClass("active_page")
    .siblings(".active_page")
    .removeClass("active_page");

  //update the current page input field
  $("#current_page").val(page_num);
  check_navigation_buttons();
}
function check_navigation_buttons() {
  var current_page = parseInt($("#current_page").val());
  var number_of_pages = Math.ceil(
    $("#pop1 .product").length / parseInt($("#show_per_page").val())
  );

  if (current_page == 0) {
    $(".previous_link").addClass("disabled");
  } else {
    $(".previous_link").removeClass("disabled");
  }
  if (current_page == number_of_pages - 1) {
    $(".next_link").addClass("disabled");
  } else {
    $(".next_link").removeClass("disabled");
  }
}

// phan trang tim kiem
jQuery(document).ready(function () {
  $(".form_search").on("submit", function () {
    var show_per_page = 5;
    var number_of_items = $(".searched-products .product").length;
    var number_of_pages = Math.ceil(number_of_items / show_per_page);

    $("#current_page2").val(0);
    $("#show_per_page2").val(show_per_page);

    var navigation_html =
      '<a class="previous_link" href="javascript:previous2();">&laquo;</a>';
    var current_link = 0;
    while (number_of_pages > current_link) {
      navigation_html +=
        '<a class="page_link2" href="javascript:go_to_page2(' +
        current_link +
        ')" longdesc="' +
        current_link +
        '">' +
        (current_link + 1) +
        "</a>";
      current_link++;
    }
    navigation_html +=
      '<a class="next_link" href="javascript:next2();">&raquo;</a>';

    $("#page_navigation2").html(navigation_html);
    $("#page_navigation2 .page_link2:first").addClass("active_page");
    $(".searched-products .product").css("display", "none");
    $(".searched-products .product")
      .slice(0, show_per_page)
      .css("display", "block");
    check_navigation_buttons2();
  });
});
function previous2() {
  new_page = parseInt($("#current_page2").val()) - 1;
  if (
    $("#page_navigation2 .active_page").prev("#page_navigation2 .page_link2")
      .length == true
  ) {
    go_to_page2(new_page);
  }
  check_navigation_buttons2();
}
function next2() {
  new_page = parseInt($("#current_page2").val()) + 1;
  if (
    $("#page_navigation2 .active_page").next("#page_navigation2 .page_link2")
      .length == true
  ) {
    go_to_page2(new_page);
  }
  check_navigation_buttons2();
}
function go_to_page2(page_number) {
  var show_per_page = parseInt($("#show_per_page2").val());
  start_from = page_number * show_per_page;
  end_at = start_from + show_per_page;
  $(".searched-products .product")
    .css("display", "none")
    .slice(start_from, end_at)
    .css("display", "block");
  $("#page_navigation2 .page_link2[longdesc=" + page_number + "]")
    .addClass("active_page")
    .siblings(".active_page")
    .removeClass("active_page");
  $("#current_page2").val(page_number);
  check_navigation_buttons2();
}
function check_navigation_buttons2() {
  var current_page = parseInt($("#current_page2").val());
  var number_of_pages = Math.ceil(
    $(".searched-products .product").length /
      parseInt($("#show_per_page2").val())
  );

  if (current_page == 0) {
    $("#page_navigation2 .previous_link").addClass("disabled");
  } else {
    $("#page_navigation2 .previous_link").removeClass("disabled");
  }
  if (current_page == number_of_pages - 1) {
    $("#page_navigation2 .next_link").addClass("disabled");
  } else {
    $("#page_navigation2 .next_link").removeClass("disabled");
  }
}

// phan trang loc sp
jQuery(document).ready(function () {
  $(".loai-category").on("click", function () {
    var show_per_page = 5;
    var number_of_items = $(".fill-products .product").length;
    var number_of_pages = Math.ceil(number_of_items / show_per_page);

    $("#current_page3").val(0);
    $("#show_per_page3").val(show_per_page);

    var navigation_html =
      '<a class="previous_link" href="javascript:previous3();">&laquo;</a>';
    var current_link = 0;
    while (number_of_pages > current_link) {
      navigation_html +=
        '<a class="page_link3" href="javascript:go_to_page3(' +
        current_link +
        ')" longdesc="' +
        current_link +
        '">' +
        (current_link + 1) +
        "</a>";
      current_link++;
    }
    navigation_html +=
      '<a class="next_link" href="javascript:next3();">&raquo;</a>';

    $("#page_navigation3").html(navigation_html);
    $("#page_navigation3 .page_link3:first").addClass("active_page");
    $(".fill-products .product").css("display", "none");
    $(".fill-products .product")
      .slice(0, show_per_page)
      .css("display", "block");
    check_navigation_buttons3();
  });
});
function previous3() {
  new_page = parseInt($("#current_page3").val()) - 1;
  if (
    $("#page_navigation3 .active_page").prev("#page_navigation3 .page_link3")
      .length == true
  ) {
    go_to_page3(new_page);
  }
  check_navigation_buttons3();
}
function next3() {
  new_page = parseInt($("#current_page3").val()) + 1;
  if (
    $("#page_navigation3 .active_page").next("#page_navigation3 .page_link3")
      .length == true
  ) {
    go_to_page3(new_page);
  }
  check_navigation_buttons3();
}
function go_to_page3(page_number) {
  var show_per_page = parseInt($("#show_per_page3").val());
  start_from = page_number * show_per_page;
  end_at = start_from + show_per_page;
  $(".fill-products .product")
    .css("display", "none")
    .slice(start_from, end_at)
    .css("display", "block");
  $("#page_navigation3 .page_link3[longdesc=" + page_number + "]")
    .addClass("active_page")
    .siblings(".active_page")
    .removeClass("active_page");
  $("#current_page3").val(page_number);
  check_navigation_buttons3();
}
function check_navigation_buttons3() {
  var current_page = parseInt($("#current_page3").val());
  var number_of_pages = Math.ceil(
    $(".fill-products .product").length / parseInt($("#show_per_page3").val())
  );

  if (current_page == 0) {
    $("#page_navigation3 .previous_link").addClass("disabled");
  } else {
    $("#page_navigation3 .previous_link").removeClass("disabled");
  }
  if (current_page == number_of_pages - 1) {
    $("#page_navigation3 .next_link").addClass("disabled");
  } else {
    $("#page_navigation3 .next_link").removeClass("disabled");
  }
}
