function onScanSuccess(decodedText) {
    let name = document.getElementById("studentName").value;
    let validQR = localStorage.getItem("attendanceSession");
    let expiry = localStorage.getItem("expiryTime");

    if (name === "") {
        alert("Enter your name first");
        return;
    }

    //if (Date.now() > expiry) {
        //document.getElementById("result").innerHTML = "❌ QR Expired";
        //return;
    // }

    if (decodedText === validQR) {
        let list = JSON.parse(localStorage.getItem("marked")) || [];

        if (list.includes(name)) {
            document.getElementById("result").innerHTML = "⚠ Already marked";
            return;
        }

        list.push(name);
        localStorage.setItem("marked", JSON.stringify(list));

        document.getElementById("result").innerHTML =
            "✅ Attendance marked for <b>" + name + "</b>";
    } else {
        document.getElementById("result").innerHTML = "❌ Invalid QR";
    }
}

let scanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: 200 }
);

scanner.render(onScanSuccess);

