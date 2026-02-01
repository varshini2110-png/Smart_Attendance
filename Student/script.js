// ===== Student Attendance Script =====

// Get elements
const nameInput = document.getElementById("studentName");
const resultBox = document.getElementById("result");

// Create QR scanner
let html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader",
  {
    fps: 10,
    qrbox: 250
  },
  false
);

// When QR scan is successful
function onScanSuccess(decodedText, decodedResult) {
  const studentName = nameInput.value.trim();

  // Check student name
  if (studentName === "") {
    resultBox.innerHTML = "❌ Please enter your name before scanning";
    resultBox.style.color = "red";
    return;
  }

  // SUCCESS – mark attendance
  resultBox.innerHTML = `✅ Attendance marked successfully for <b>${studentName}</b>`;
  resultBox.style.color = "green";

  console.log("QR Scanned:", decodedText);
  console.log("Student:", studentName);

  // Stop scanning after success
  html5QrcodeScanner.clear();
}

// When scan fails (ignore errors)
function onScanFailure(error) {
  // Do nothing (prevents Invalid QR spam)
}

// Start scanner
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
