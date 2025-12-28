// Initialize QR Code Styling object
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: "https://example.com",
    image: "",
    dotsOptions: {
        color: "#4f46e5",
        type: "square",
        gradient: {
            type: "linear",
            rotation: 45,
            colorStops: [
                { offset: 0, color: "#4f46e5" },
                { offset: 1, color: "#764ba2" }
            ]
        }
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    },
    cornersSquareOptions: {
        type: "square",
        color: "#4f46e5"
    }
});

// Elements
const qrData = document.getElementById("qr-data");
const qrDotsColor = document.getElementById("qr-dots-color");
const qrGradientColor = document.getElementById("qr-gradient-color");
const qrBgColor = document.getElementById("qr-bg-color");
const qrDotsType = document.getElementById("qr-dots-type");
const qrCornersType = document.getElementById("qr-corners-type");
const qrLogo = document.getElementById("qr-logo");
const logoControls = document.getElementById("logo-controls");
const qrLogoSize = document.getElementById("qr-logo-size");
const logoSizeVal = document.getElementById("logo-size-val");
const qrLogoBg = document.getElementById("qr-logo-bg");
const resetBtn = document.getElementById("reset-btn");
const canvasContainer = document.getElementById("canvas-container");
const downloadPng = document.getElementById("download-png");
const downloadSvg = document.getElementById("download-svg");

// Initial Render
qrCode.append(canvasContainer);

// Update Function
const updateQR = () => {
    const data = qrData.value || "https://example.com";
    const dotsColor = qrDotsColor.value;
    const gradientColor = qrGradientColor.value;
    const bgColor = qrBgColor.value;
    const dotsType = qrDotsType.value;
    const cornersType = qrCornersType.value;
    const logoSize = parseFloat(qrLogoSize.value);
    const hideBg = qrLogoBg.checked;

    qrCode.update({
        data: data,
        dotsOptions: {
            color: dotsColor,
            type: dotsType,
            gradient: {
                type: "linear",
                rotation: 45,
                colorStops: [
                    { offset: 0, color: dotsColor },
                    { offset: 1, color: gradientColor }
                ]
            }
        },
        backgroundOptions: {
            color: bgColor,
        },
        imageOptions: {
            hideBackgroundDots: hideBg,
            imageSize: logoSize,
            margin: 10
        },
        cornersSquareOptions: {
            type: cornersType,
            color: dotsColor
        },
        cornersDotOptions: {
            type: cornersType,
            color: dotsColor
        }
    });
};

// Event Listeners
qrData.addEventListener("input", updateQR);
qrDotsColor.addEventListener("input", updateQR);
qrGradientColor.addEventListener("input", updateQR);
qrBgColor.addEventListener("input", updateQR);
qrDotsType.addEventListener("change", updateQR);
qrCornersType.addEventListener("change", updateQR);
qrLogoSize.addEventListener("input", (e) => {
    logoSizeVal.textContent = e.target.value;
    updateQR();
});
qrLogoBg.addEventListener("change", updateQR);

// Logo Upload Handler
qrLogo.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            qrCode.update({
                image: event.target.result
            });
            logoControls.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    } else {
        qrCode.update({
            image: ""
        });
        logoControls.classList.add("hidden");
    }
});

// Download Handlers
downloadPng.addEventListener("click", () => {
    qrCode.download({ name: "qr-code", extension: "png" });
});

downloadSvg.addEventListener("click", () => {
    qrCode.download({ name: "qr-code", extension: "svg" });
});

// Reset Logic
resetBtn.addEventListener("click", () => {
    qrData.value = "";
    qrDotsColor.value = "#4f46e5";
    qrGradientColor.value = "#764ba2";
    qrBgColor.value = "#ffffff";
    qrDotsType.value = "square";
    qrCornersType.value = "square";
    qrLogo.value = "";
    logoControls.classList.add("hidden");
    qrLogoSize.value = "0.4";
    logoSizeVal.textContent = "0.4";
    qrLogoBg.checked = true;
    
    qrCode.update({
        data: "https://example.com",
        image: "",
        dotsOptions: {
            color: "#4f46e5",
            type: "square",
            gradient: {
                type: "linear",
                rotation: 45,
                colorStops: [
                    { offset: 0, color: "#4f46e5" },
                    { offset: 1, color: "#764ba2" }
                ]
            }
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        cornersSquareOptions: {
            type: "square",
            color: "#4f46e5"
        },
        cornersDotOptions: {
            type: "square",
            color: "#4f46e5"
        }
    });
});
