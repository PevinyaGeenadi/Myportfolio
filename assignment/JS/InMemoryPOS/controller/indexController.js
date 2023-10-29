///---------------navigation

$("#order").css("display","block");
$("#customer").css("display","none");
$("#item").css("display","none");
$("#details").css("display","none");

$("#btnCustomer").click(function () {
    $("#order").css("display","none");
    $("#customer").css("display","block");
    $("#item").css("display","none");
    $("#details").css("display","none");

  });

$("#btnItem").click(function () {
    $("#order").css("display","none");
    $("#customer").css("display","none");
    $("#item").css("display","block");
    $("#details").css("display","none");
});

$("#btnDetails").click(function () {
    $("#order").css("display","none");
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#details").css("display","block");
});

$("#btnOrder").click(function () {
    $("#order").css("display","block");
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#details").css("display","none");
});

year = new Date().getFullYear();
month = new Date().getMonth();
date = new Date().getDate();

$("#currentDate").text(`${year}-${month+1}-${date}`);