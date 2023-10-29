function loadingOrder() {
    loadOrderTable();
    loadOrderDeatils();
}
function loadOrderTable() {
    $('#orderTable').empty();
    for(var i of orderDB){
        let row=`<tr><td>${i.getOrderID()}</td><td>${i.getCusName()}</td><td>${i.getOrderTotal()}</td><td>${i.getOrderDate()}</td></tr>`
        $('#orderTable').append(row);
    }
}
function loadOrderDeatils() {
    $('#orderDetailsTable').empty();
    for (var i of orderDetailsDB){
        let row=`<tr><td>${i.getOID()}</td><td>${i.getoItemCode()}</td><td>${i.getiPrice()}</td><td>${i.getoQty()}</td><td>${i.getoTotal()}</td></tr>`
        $('#orderDetailsTable').append(row);
    }
}