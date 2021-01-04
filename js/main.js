// GLOBAL VARIABLES
var ubers = ["Uber X", "Uber SUV", "Uber Black"];

var uberX = [8000, 12000, 10000];
// Thứ tự lần lượt giá tiền đường đi trong bảng UBER X
var uberSUV = [9000, 14000, 12000];
// Thứ tự lần lượt giá tiền đường đi trong bảng UBER SUV
var uberBlack = [10000, 16000, 14000];
// Thứ tự lần lượt giá tiền đường đi trong bảng UBER Black
var distanceTable = [1, 20];
// Khoảng cách tối đa cho một gói cước được áp dụng
var pricePerTimeDelay = [2000, 3000, 4000];
// Số tiền trung bình mỗi phút chờ lần lượt của UBER X, UBER SUV, UBER Black
var check = false;
// Kiểm tra tính tiền 
// END GLOBAL VARIABLES 

function getEle(id) {
    return document.getElementById(id);
}
function calculateMoney(distance, time, vehicle, indexVehicle) {
    var money = 0;
    // 0 < Số KM <= 1
    if (distance > 0 && distance <= distanceTable[0]) {
        money = distance * vehicle[0] + time * pricePerTimeDelay[indexVehicle];
    }
    // 1 < Số KM <= 20
    else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
        money = vehicle[0] + (distance - distanceTable[0]) * vehicle[1] + time * pricePerTimeDelay[indexVehicle];
    }
    // Số KM > 20
    else {
        money = vehicle[0] + (distanceTable[1] - distanceTable[0]) * vehicle[1] + (distance - distanceTable[1]) * vehicle[2] + time * pricePerTimeDelay[indexVehicle];
    }
    return money;
}

function getMoney(car, distance, time) {
    var money = 0;
    switch (car) {
        // Truong hop chon UBER X
        case "uberX":
            money = calculateMoney(distance, time, uberX, 0);
            break;
        // Truong hop chon UBER SUV   
        case "uberSUV":
            money = calculateMoney(distance, time, uberSUV, 1);
            break;
        // Truong hop chon UBER Black
        case "uberBlack":
            money = calculateMoney(distance, time, uberBlack, 2);
            break;
        default:
            break;
    }
    return money;
}

function getCar() {
    var car = "";
    var uber_X = getEle("uberX");
    var uber_SUV = getEle("uberSUV");
    var uber_Black = getEle("uberBlack");
    if (uber_X.checked) {
        car = uber_X.value;
    } else if (uber_SUV.checked) {
        car = uber_SUV.value;
    } else if (uber_Black.checked) {
        car = uber_Black.value;
    }
    return car;
}

getEle("tinhTien").addEventListener("click", function () {
    var car = getCar();
    var distance = getEle("distance").value;
    var time = getEle("time").value;
    // Set warning input
    getEle("warn-km").style.display = "none";
    getEle("warn-time").style.display = "none";
    getEle("divThanhTien").style.display = "none";
    // Test input
    if (car == "") {
        alert("Vui lòng chọn loại xe");
        return;
    }
    if (distance == "") {
        alert("Vui lòng nhập vào số KM");
        return;
    }
    if (time == "") {
        alert("Vui lòng nhập vào thời gian chờ");
        return;
    }
    if (distance <= 0 && time < 0) {
        getEle("warn-km").style.display = "block";
        getEle("warn-time").style.display = "block";
        return;
    }
    else if (distance <= 0) {
        getEle("warn-km").style.display = "block";
        return;
    }
    else if (time < 0) {
        getEle("warn-time").style.display = "block";
        return;
    }
    // END Test input
    check = true; // Đã tính tiền

    var money = getMoney(car, distance, time);
    getEle("divThanhTien").style.display = "block";
    getEle("xuatTien").innerHTML = money;
});

function getBill(distance, time, money, vehicle, indexVehicle) {
    // In số tiền quãng đường đi được
    // 0 < Số KM <=1
    if (distance > 0 && distance <= distanceTable[0]) {
        getEle("line_1").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_1 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distance + " km";
        getLine[2].innerHTML = vehicle[0];
        getLine[3].innerHTML = distance * vehicle[0];
    }
    // 1 < Số KM <= 20
    else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
        getEle("line_1").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_1 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distanceTable[0] + " km";
        getLine[2].innerHTML = vehicle[0];
        getLine[3].innerHTML = distanceTable[0] * vehicle[0];

        getEle("line_2").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_2 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distance - distanceTable[0] + " km";
        getLine[2].innerHTML = vehicle[1];
        getLine[3].innerHTML = (distance - distanceTable[0]) * vehicle[1];
    }
    // Số KM > 20
    else {
        getEle("line_1").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_1 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distanceTable[0] + " km";
        getLine[2].innerHTML = vehicle[0];
        getLine[3].innerHTML = distanceTable[0] * vehicle[0];

        getEle("line_2").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_2 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distanceTable[1] - distanceTable[0] + " km";
        getLine[2].innerHTML = vehicle[1];
        getLine[3].innerHTML = (distanceTable[1] - distanceTable[0]) * vehicle[1];

        getEle("line_3").style.display = "table-row";
        var getLine = document.querySelectorAll("#bill table #line_3 td");
        getLine[0].innerHTML = ubers[0];
        getLine[1].innerHTML = distance - distanceTable[1] + " km";
        getLine[2].innerHTML = vehicle[2];
        getLine[3].innerHTML = (distance - distanceTable[1]) * vehicle[2];
    }

    // In số tiền khoảng thời gian chờ
    getEle("line_4").style.display = "table-row";
    var getTimeBill = document.querySelectorAll("#bill table #line_4 td");
    getTimeBill[0].innerHTML = "Thời gian chờ";
    getTimeBill[1].innerHTML = time + " phút";
    getTimeBill[2].innerHTML = pricePerTimeDelay[indexVehicle];
    getTimeBill[3].innerHTML = time * pricePerTimeDelay[indexVehicle];

    // In tổng tiền
    getEle("line_5").style.display = "table-row";
    var getTotalBill = document.querySelectorAll("#bill table #line_5 td");
    getTotalBill[0].innerHTML = "Total";
    getTotalBill[3].innerHTML = money;
}

getEle("inHoaDon").addEventListener("click", function () {
    var car = getCar();
    var distance = getEle("distance").value;
    var time = getEle("time").value;
    var money = getMoney(car, distance, time);
    // Set warning input
    getEle("warn-km").style.display = "none";
    getEle("warn-time").style.display = "none";
    // SET line
    getEle("line_1").style.display = "none";
    getEle("line_2").style.display = "none";
    getEle("line_3").style.display = "none";
    getEle("line_4").style.display = "none";
    getEle("line_5").style.display = "none";
    // Test input
    if (!check) {
        alert("Vui lòng TÍNH TIỀN trước khi in hóa đơn");
        return;
    }
    // End Test Input
    check = false; // Đặt lại mặc định là chưa tính tiền
    switch (car) {
        case "uberX":
            getBill(distance, time, money, uberX, 0);
            break;
        case "uberSUV":
            getBill(distance, time, money, uberSUV, 1);
            break;
        case "uberBlack":
            getBill(distance, time, money, uberBlack, 2);
            break;
        default:
            break;
    }
});
