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

// END GLOBAL VARIABLES 

function calculateMoney(distance, time, vehicle) {
    // 0 < Số KM <= 1
    if (distance > 0 && distance <= distanceTable[0]) {
        money = vehicle[0] + time * pricePerTimeDelay[0];
    }
    // 1 < Số KM <= 20
    else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
        money = vehicle[0] + (distance - distanceTable[0]) * vehicle[1] + time * pricePerTimeDelay[0];
    }
    // Số KM > 20
    else {
        money = vehicle[0] + (distanceTable[1] - distanceTable[0]) * vehicle[1] + (distance - distanceTable[1]) * vehicle[2] + time * pricePerTimeDelay[0];
    }
    return money;
}

function getMoney(car, distance, time) {
    var money = 0;
    switch (car) {
        // Truong hop chon UBER X
        case "uberX":
            money = calculateMoney(distance, time, uberX);
            break;
        // Truong hop chon UBER SUV   
        case "uberSUV":
            money = calculateMoney(distance, time, uberSUV);
            break;
        // Truong hop chon UBER Black
        case "uberBlack":
            money = calculateMoney(distance, time, uberBlack);
            break;
        default:
            break;
    }
    return money;
}

function getCar() {
    var car = "";
    var uber_X = document.getElementById("uberX");
    var uber_SUV = document.getElementById("uberSUV");
    var uber_Black = document.getElementById("uberBlack");
    if (uber_X.checked) {
        car = uber_X.value;
    } else if (uber_SUV.checked) {
        car = uber_SUV.value;
    } else if (uber_Black.checked) {
        car = uber_Black.value;
    }
    return car;
}

document.getElementById("tinhTien").addEventListener("click", function () {
    var car = getCar();
    var distance = document.getElementById("distance").value;
    var time = document.getElementById("time").value;
    // Set warning input
    document.getElementById("warn-km").style.display = "none";
    document.getElementById("warn-time").style.display = "none";
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
    if (distance <= 0 && time <= 0) {
        document.getElementById("warn-km").style.display = "block";
        document.getElementById("warn-time").style.display = "block";
        return;
    }
    else if (distance <= 0) {
        document.getElementById("warn-km").style.display = "block";
        return;
    }
    else if (time <= 0) {
        document.getElementById("warn-time").style.display = "block";
        return;
    }
    // END Test input

    var money = getMoney(car, distance, time);
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = money;
});

function getBill(distance, time, money, vehicle) {
    // In số tiền quãng đường đi được
    // 0 < Số KM <=1
    if (distance > 0 && distance <= distanceTable[0]) {
        document.getElementById("line_1").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_1 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distance + " km";
        getFirstLine[2].innerHTML = vehicle[0];
        getFirstLine[3].innerHTML = distance * vehicle[0];
    }
    // 1 < Số KM <= 20
    else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
        document.getElementById("line_1").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_1 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distanceTable[0] + " km";
        getFirstLine[2].innerHTML = vehicle[0];
        getFirstLine[3].innerHTML = distanceTable[0] * vehicle[0];

        document.getElementById("line_2").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_2 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distance - distanceTable[0] + " km";
        getFirstLine[2].innerHTML = vehicle[1];
        getFirstLine[3].innerHTML = (distance - distanceTable[0]) * vehicle[1];
    }
    // Số KM > 20
    else {
        document.getElementById("line_1").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_1 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distanceTable[0] + " km";
        getFirstLine[2].innerHTML = vehicle[0];
        getFirstLine[3].innerHTML = distanceTable[0] * vehicle[0];

        document.getElementById("line_2").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_2 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distanceTable[1] - distanceTable[0] + " km";
        getFirstLine[2].innerHTML = vehicle[1];
        getFirstLine[3].innerHTML = (distanceTable[1] - distanceTable[0]) * vehicle[1];

        document.getElementById("line_3").style.display = "table-row";
        var getFirstLine = document.querySelectorAll("#bill table #line_3 td");
        getFirstLine[0].innerHTML = ubers[0];
        getFirstLine[1].innerHTML = distance - distanceTable[1] + " km";
        getFirstLine[2].innerHTML = vehicle[2];
        getFirstLine[3].innerHTML = (distance - distanceTable[1]) * vehicle[2];
    }

    // In số tiền khoảng thời gian chờ
    var getTimeBill = document.querySelectorAll("#bill table #line_4 td");
    getTimeBill[1].innerHTML = time + " phút";
    getTimeBill[2].innerHTML = pricePerTimeDelay[0];
    getTimeBill[3].innerHTML = time * pricePerTimeDelay[0];

    // In tổng tiền
    document.getElementById("totalBill").innerHTML = money;
}

document.getElementById("inHoaDon").addEventListener("click", function () {
    var car = getCar();
    var distance = document.getElementById("distance").value;
    var time = document.getElementById("time").value;
    var money = getMoney(car, distance, time);
    switch (car) {
        case "uberX":
            getBill(distance, time, money, uberX);
            break;

        case "uberSUV":
            getBill(distance, time, money, uberSUV);
            break;
        case "uberBlack":
            getBill(distance, time, money, uberBlack);
            break;
        default:
            break;
    }
});
