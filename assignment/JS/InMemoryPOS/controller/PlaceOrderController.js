function generateOrderID() {
    try {
        let lastOId = orderDB[orderDB.length - 1].getOrderID();
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderId").val("O00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderId").val("O0" + newOId);
        } else {
            $("#txtOrderId").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderId").val("O001");
    }

}

function forOrder(){
    generateOrderID();
    loadCustIDs();
    loadItemIds();
    $("#btnPurchase").attr('disabled',true);
}

let fullTotal;
//-------Customer Details---------------
function loadCustIDs(){
     $("#cmbCustomerIDS").empty();
    var customer=getCustomers();
    var ids=document.getElementById("cmbCustomerIDS");
    for (var i in customer){
        var opt=document.createElement("option")
        opt.value=customer[i].getCustomerId();
        opt.text=customer[i].getCustomerId();
        ids.appendChild(opt);
    }
}

$("#cmbCustomerIDS").click(function () {
    let cus=searchCustomerId($('#cmbCustomerIDS').val());
    if(cus!=null){
        $('#txtCusNameForOrder').val(cus.getCustomerName());
        $('#txtAddressForOrder').val(cus.getAddress());
        $('#txtCusSalaryForOrder').val(cus.getSalary());
    }
});

function searchCustomerId(id) {
    for (var i in customerDB){
        if(customerDB[i].getCustomerId()==id) return customerDB[i];

    }
    return null;
}

function getCustomers() {
    return customerDB;
}

// --------Item Details--------------------------
function loadItemIds(){
    $("#cmbItemIds").empty();
    var items=getItems();
    var ids=document.getElementById("cmbItemIds");
    for (var i in items){
        var opt=document.createElement("option")
        opt.value=items[i].getItemId();
        opt.text=items[i].getItemId();
        ids.appendChild(opt);
    }
}

$("#cmbItemIds").click(function () {
    let item=searchItemCode($('#cmbItemIds').val());
    if(item!=null){
        $('#txtItemNameForOrder').val(item.getItemName());
        $('#txtItemIDForOrder').val(item.getItemId());
        $('#txtQTYForOrder').val(item.getItemQty());
        $('#txtQTYONHand').val(item.getItemQty());
        $('#txtItemPriceForOrder').val(item.getUnitPrice());
    }
});

function searchItemCode(id) {
    for (var i in itemDB){
        if(itemDB[i].getItemId()==id) return itemDB[i];

    }
    return null;
}

function getItems() {
    return itemDB;
}

function qtyUpdate() {
    let item;
    var itemQty=$('#txtQTYONHand').val();
    var orderQty=$('#txtOrderQty').val();

    var updateQty=itemQty-orderQty;
    for (var i in itemDB){
        if($('#cmbItemIds').val()===itemDB[i].getItemId()){
            item=itemDB[i];
            item.setItemQTY(updateQty);
            $("#txtQTYONHand").val(item.getItemQty());
        }
    }
}

$("#btnAddToCart").click(function () {
    let qty=parseInt($("#txtQTYONHand").val());
    let Oqty=parseInt($("#txtOrderQty").val());
    if($('#txtOrderQty').val()!=""){
        if(qty<Oqty){
            alert("Not Available This QTY..!");
        }else{
            qtyUpdate();
            addToCart();
            loadCart();
            getTotal();
            $("#btnPurchase").attr('disabled',false);
            $("#txtItemIDForOrder,#txtItemNameForOrder,#txtQTYONHand,#txtOrderQty,#txtItemPriceForOrder").val("")
        }
    }else{
        alert("Please Enter Order Qty..!");
    }
});

function addToCart() {
    let oId=$("#txtOrderId").val();
    let iID=$("#txtItemIDForOrder").val();
    let iName=$("#txtItemNameForOrder").val();
    let iPrice=$("#txtItemPriceForOrder").val();
    let orderQty=$("#txtOrderQty").val();
    let total=iPrice*orderQty;
    fullTotal=total+fullTotal;

    for (let i=0;i<cartDB.length;i++){
        if(cartDB[i].getcartICode()===iID){
            var newQty=+cartDB[i].getcartOQty() + +orderQty;
            let newTotal=iPrice*newQty;
            cartDB[i].setcartOQty(newQty);
            cartDB[i].setTotal(newTotal);

            return;

        }
    }
    cartDB.push(new CartDTO(oId,iID,iName,iPrice,orderQty,total));
    $("#txtBalance,#txtCash,#txtDiscount").val("");
}

function loadCart() {
    $("#tblCart").empty();
    for (var i of cartDB){
        let row=`<tr><td>${i.getCartOID()}</td><td>${i.getcartICode()}</td><td>${i.getcartIName()}</td><td>${i.getcartIPrice()}</td><td>${i.getcartOQty()}</td><td>${i.getTotal()}</td></tr>`;
        $("#tblCart").append(row);
    }
}

function getTotal() {
    let tot = 0;
    $('#tblCart>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(5)).text());
        $('#total>span').text(tot).append('.00');

        if($("#txtDiscount").val()===""){

            $('#subtotal>span').text(tot);
        }
    });
    t = tot;
}


$("#txtCash").on('keyup', function () {
    let cash=parseFloat($("#txtCash").val());
    let tot = $("#total>span").text();

    if ($(cash>tot)) {
        let total=parseFloat($("#subtot").text());
        let balance= cash - total;
        $("#txtBalance").val(balance);

    }
});

$('#txtDiscount').on('keyup', function () {
    if ($("#txtDiscount").val() === "") {
        $('#subtotal>span').text('0.00');
    } else {
        let tot = parseFloat(t);
        let dis = tot/100 * parseFloat($("#txtDiscount").val());

        $('#subtotal>span').text(tot - dis);

        let cash = parseInt($("#txtCash").val());
        let subTot = parseInt($("#subtot").text());
        $("#txtBalance").val(cash-subTot);
    }
});

function placeOrder() {

    if(saveOrder()){
        for (var i of cartDB){
            orderDetailsDB.push(new OrderDetailsDTO(i.getCartOID(),i.getcartICode(),i.getcartIPrice(),i.getcartOQty(),i.getTotal()));
        }
        alert("Order Successfully...!")
    }
}

function saveOrder() {
    let oId=$("#txtOrderId").val();
    let cName=$("#txtCusNameForOrder").val();
    let fullTotal=$("#total").text();
    let date;
    if ($("#txtOrderDate").val()===""){
        date = $("#currentDate").text();
    }else{
        date = $("#txtOrderDate").val();
    }


    return orderDB.push(new OrderDTO(oId,cName,fullTotal,date));
}

$("#btnPurchase").click(function () {
    placeOrder();
    generateOrderID();
    cartDB.splice(0,cartDB.length);
    $('#tblCart').empty();
    $("#btnPurchase").attr('disabled',true);
    $("#txtItemNameForOrder,#txtItemPriceForOrder,#txtQTYONHand,#txtOrderQty,#txtCusSalaryForOrder,#txtCusNameForOrder,#txtCash,#txtBalance,#txtDiscount,#txtAddressForOrder").val("")
    $("#total > span,#subtot").text("00");
});



