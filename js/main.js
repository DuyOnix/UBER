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
var pricePerTime = [2000, 3000, 4000];
// Số tiền trung bình mỗi phút chờ lần lượt của UBER X, UBER SUV, UBER Black

// END GLOBAL VARIABLES 

function calculateMoney(car, distance, time) {
    var money = 0;
    switch (car) {
        // Truong hop chon UBER X
        case "uberX":
            // 0 < Số KM <= 1
            if (distance > 0 && distance <= distanceTable[0]) {
                money = uberX[0] + time * pricePerTime[0];
            }
            // 1 < Số KM <= 20
            else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
                money = uberX[0] + (distance - distanceTable[0]) * uberX[1] + time * pricePerTime[0];
            }
            // Số KM > 20
            else {
                money = uberX[0] + (distanceTable[1] - distanceTable[0]) * uberX[1] + (distance - distanceTable[1]) * uberX[2] + time * pricePerTime[0];
            }
            break;
        // Truong hop chon UBER SUV   
        case "uberSUV":
            if (distance > 0 && distance <= distanceTable[0]) {
                money = uberSUV[0] + time * pricePerTime[1];
            }
            else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
                money = uberSUV[0] + (distance - distanceTable[0]) * uberSUV[1] + time * pricePerTime[1];
            }
            else {
                money = uberSUV[0] + (distanceTable[1] - distanceTable[0]) * uberSUV[1] + (distance - distanceTable[1]) * uberSUV[2] + time * pricePerTime[1];
            }
            break;
        // Truong hop chon UBER Black
        case "uberBlack":
            if (distance > 0 && distance <= distanceTable[0]) {
                money = uberBlack[0] + time * pricePerTime[2];
            }
            else if (distance > distanceTable[0] && distance <= distanceTable[1]) {
                money = uberBlack[0] + (distance - distanceTable[0]) * uberBlack[1] + +time * pricePerTime[2];
            }
            else {
                money = uberBlack[0] + (distanceTable[1] - distanceTable[0]) * uberBlack[1] + (distance - distanceTable[1]) * uberBlack[2] + time * pricePerTime[2];
            }
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
    // Test input
    if (car == "") {
        alert("Vui lòng chọn loại xe");
        return;
    }
    if (distance == "") {
        alert("Vui lòng nhập vào số KM");
        return;
    }
    if (distance <= 0) {
        alert("Vui lòng nhập đúng số KM (km > 0)");
        return;
    }
    if (time == "") {
        alert("Vui lòng nhập vào thời gian chờ");
        return;
    }
    if (time <= 0) {
        alert("Vui lòng nhập đúng thời gian chờ (time > 0)");
        return;
    }
    // END Test input

    var money = calculateMoney(car, distance, time);
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

    // In thời gian chờ
    var getTimeBill = document.querySelectorAll("#bill table #line_4 td");
    getTimeBill[1].innerHTML = time + " phút";
    getTimeBill[2].innerHTML = pricePerTime[0];
    getTimeBill[3].innerHTML = time * pricePerTime[0];

    // In tổng tiền
    document.getElementById("totalBill").innerHTML = money;
}

document.getElementById("inHoaDon").addEventListener("click", function () {
    var car = getCar();
    var distance = document.getElementById("distance").value;
    var time = document.getElementById("time").value;
    var money = calculateMoney(car, distance, time);
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
