// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
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
    
    // Wallet Modal Elements
    const walletBtn = document.getElementById("wallet-btn");
    const walletModal = document.getElementById("wallet-modal");
    const closeModal = document.getElementById("close-modal");

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
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 10 },
        cornersSquareOptions: { type: "square", color: "#4f46e5" }
    });

    // Initial Render
    qrCode.append(canvasContainer);

    // Update Function
    const updateQR = () => {
        const data = qrData.value || "https://example.com";
        qrCode.update({
            data: data,
            dotsOptions: {
                color: qrDotsColor.value,
                type: qrDotsType.value,
                gradient: {
                    type: "linear",
                    rotation: 45,
                    colorStops: [
                        { offset: 0, color: qrDotsColor.value },
                        { offset: 1, color: qrGradientColor.value }
                    ]
                }
            },
            backgroundOptions: { color: qrBgColor.value },
            imageOptions: {
                hideBackgroundDots: qrLogoBg.checked,
                imageSize: parseFloat(qrLogoSize.value),
                margin: 10
            },
            cornersSquareOptions: { type: qrCornersType.value, color: qrDotsColor.value },
            cornersDotOptions: { type: qrCornersType.value, color: qrDotsColor.value }
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
                qrCode.update({ image: event.target.result });
                logoControls.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
        } else {
            qrCode.update({ image: "" });
            logoControls.classList.add("hidden");
        }
    });

    // Download Handlers
    downloadPng.addEventListener("click", () => qrCode.download({ name: "qr-code", extension: "png" }));
    downloadSvg.addEventListener("click", () => qrCode.download({ name: "qr-code", extension: "svg" }));

    // Generate Static Donation QRs
    const generateDonationQRs = () => {
        const vodaQR = new QRCodeStyling({
            width: 150,
            height: 150,
            data: "tel:01000012898",
            dotsOptions: { color: "#e60000", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { type: "extra-rounded", color: "#e60000" }
        });
        
        const etiQR = new QRCodeStyling({
            width: 150,
            height: 150,
            data: "tel:01158770319",
            dotsOptions: { color: "#008a00", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { type: "extra-rounded", color: "#008a00" }
        });

        const vodaContainer = document.getElementById("voda-qr");
        const etiContainer = document.getElementById("eti-qr");
        
        if (vodaContainer && etiContainer) {
            vodaQR.append(vodaContainer);
            etiQR.append(etiContainer);
        }
    };

    generateDonationQRs();

    // Modal Event Listeners
    if (walletBtn && walletModal && closeModal) {
        walletBtn.addEventListener("click", () => {
            walletModal.classList.remove("hidden");
            walletModal.classList.add("flex");
        });

        closeModal.addEventListener("click", () => {
            walletModal.classList.add("hidden");
            walletModal.classList.remove("flex");
        });

        window.addEventListener("click", (e) => {
            if (e.target === walletModal) {
                walletModal.classList.add("hidden");
                walletModal.classList.remove("flex");
            }
        });
    }

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
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { type: "square", color: "#4f46e5" },
            cornersDotOptions: { type: "square", color: "#4f46e5" }
        });
    });
});

// Reveal Number Function (Global)
window.revealNumber = (id, actualNumber) => {
    const span = document.getElementById(id);
    const revealBtn = document.getElementById(id.split('-')[0] + '-reveal');
    const copyBtn = document.getElementById(id.split('-')[0] + '-copy');

    if (span && revealBtn && copyBtn) {
        span.textContent = actualNumber;
        span.classList.remove("text-gray-400");
        span.classList.add("text-gray-800");
        revealBtn.classList.add("hidden");
        copyBtn.classList.remove("hidden");
    }
};

// Copy to Clipboard Function (Global)
window.copyToClipboard = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent;
    const btn = window.event.target; // Using window.event for better compatibility
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "تم النسخ!";
        const originalBg = btn.className;
        btn.className = btn.className.replace(/bg-\w+-\d+/, "bg-gray-600");
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.className = originalBg;
        }, 2000);
    });
};
