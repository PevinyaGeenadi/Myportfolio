$("#btnSaveCustomer").click(function () {
    if (confirm("Are You sure, you want to Save..!")){
        saveCustomer();
        clearAll();
        loadAllCustomers();
        generateCusId();
    }else{
    }

});

$("#btnDeleteCustomer").click(function () {
    let id = $("#txtCId").val();
    let option = confirm(`Do you want to delete ID:${id}`);
    if (option) {
        let remove = deleteCustomer(id);
        if (remove) {
            alert("Customer Deleted..!");
            clearAll();
            generateCusId();
        } else {
            alert("Something Went Wrong , Try Again!");
        }
    }
    loadAllCustomers();

});


// search customer
$("#btnSearchCustomer").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCId").val(response.getCustomerId());
        $("#txtCName").val(response.getCustomerName());
        $("#txtAddress").val(response.getAddress());
        $("#txtSalary").val(response.getSalary());
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

// Events end


// CRUD OPERATIONS START
function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getAddress()}</td><td>${i.getSalary()}</td></tr>`;
        /*select the table body and append the row */
        $("#tblCustomer").append(row);

        $("#tblCustomer>tr").dblclick(function () {

            //set values for the input field
            $("#txtCId").val($(this).children(":eq(0)").text());
            $("#txtCName").val($(this).children(":eq(1)").text());
            $("#txtAddress").val($(this).children(":eq(2)").text());
            $("#txtSalary").val($(this).children(":eq(3)").text());
        });
    }
}

function saveCustomer() {
    //gather customer information
    let customerID = $("#txtCId").val();
    let customerName = $("#txtCName").val();
    let customerAddress = $("#txtAddress").val();
    let customerSalary = $("#txtSalary").val();

    //create Object

    var customer = new CustomerDTO(customerID, customerName, customerAddress, customerSalary);

    customerDB.push(customer);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() === id) {
            return customerDB[i];
        }
    }
}

function generateCusId() {
    try {
        let lastCusId = customerDB[customerDB.length - 1].getCustomerId();
        let newCusId = parseInt(lastCusId.substring(1, 4)) + 1;
        if (newCusId < 10) {
            $("#txtCId").val("C00" + newCusId);
        } else if (newCusId < 100) {
            $("#txtCId").val("C0" + newCusId);
        } else {
            $("#txtCId").val("C" + newCusId);
        }
    } catch (e) {
        $("#txtCId").val("C001");
    }
}

function OpenLoadFunction() {
    generateCusId();
}

function deleteCustomer(id) {
    let customer;
    if (id != null) {
        for (var i = 0; i < customerDB.length; i++) {
            if (id == customerDB[i].getCustomerId()) {
                customer = customerDB[i];
            }
        }
        let index = customerDB.indexOf(customer);
        customerDB.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

function updateCustomer(){
    let cName = $("#txtCName").val();
    let cAddress = $("#txtAddress").val();
    let cSalary = $("#txtSalary").val();
    for (var i=0; i<customerDB.length; i++){
        if (customerDB[i].getCustomerId()==$("#txtCId").val()){
            var customer =customerDB[i];
            customer.setCustomerName(cName);
            customer.setCustomerAddress(cAddress);
            customer.setCustomerSalary(cSalary);
        }
    }
}

$("#btnUpdateCustomer").click(function () {
    if (confirm("Are You sure, you want to update this customer..!!")){
        updateCustomer();
        loadAllCustomers();
        clearAll();
        generateCusId();
    }else{

    }

})

// CRUD OPERATIONS ENDED


// validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;

const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCId,#txtCName,#txtAddress,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCId,#txtCName,#txtAddress,#txtSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCId").on('keyup', function (eventOb) {
    setButton();

});

$("#txtCName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnSaveCustomer").attr('disabled', true);

function clearAll() {
    $('#txtCId,#txtCName,#txtAddress,#txtSalary').val("");
    $('#txtCId,#txtCName,#txtAddress,#txtSalary').css('border', '2px solid #ced4da');
    $('#txtCName').focus();
    $("#btnSaveCustomer").attr('disabled', true);
    loadAllCustomers();
    generateCusId();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

function formValid() {
    var cusName = $("#txtCName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCName").css('border', '2px solid green');
        $("#lblcusname").text("");
        var cusAddress = $("#txtAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            var cusSalary = $("#txtSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            $("#txtAddress").css('border', '2px solid green');
            $("#lblcusaddress").text("");
            if (resp) {
                $("#txtSalary").css('border', '2px solid green');
                $("#lblcussalary").text("");
                return true;
            } else {
                $("#txtSalary").css('border', '2px solid red');
                $("#lblcussalary").text("Wrong format : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtAddress").css('border', '2px solid red');
            $("#lblcusaddress").text("Wrong Format: Minimum 5");
            return false;
        }
    } else {
        $("#txtCName").css('border', '2px solid red');
        $("#lblcusname").text("Wrong format : Minimum 5, Max 20, Spaces Allowed");
        return false;
    }
}

function checkIfValid() {

    $("#txtCName").focus();
    var cusName = $("#txtCName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtAddress").focus();
        var cusAddress = $("#txtAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            $("#txtSalary").focus();
            var cusSalary = $("#txtSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            if (resp) {
                let res = confirm("Do you really need to add this Customer..?");
                if (res) {
                    saveCustomer();
                    clearAll();
                }
            } else {
                $("#txtSalary").focus();
            }
        } else {
            $("#txtAddress").focus();
        }
    } else {
        $("#txtCName").focus();
    }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveCustomer").attr('disabled', false);
    } else {
        $("#btnSaveCustomer").attr('disabled', true);
    }
}

$('#btnSaveCustomer').click(function () {
    checkIfValid();
});
