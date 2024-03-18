document.getElementById("savePdfButton").addEventListener("click", async() => {
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([180, 250]); // smaller page size
    const { width, height } = page.getSize();

    let y = height - 50;
    // Add header "Receipt"
    page.drawText("Receipt", {
        x: 44.5,
        y: height - 30,
        size: 18,
        color: rgb(0, 0, 0),
    });

    y -= 10;

    // เขียนรายการสินค้าในเอกสาร PDF
    listCard2.childNodes.forEach((item) => {
        const image = item.querySelector("img").src;
        const name = item.querySelectorAll("div")[1].textContent;
        const price = item.querySelectorAll("div")[2].textContent;

        const text = `${name}: ${price}`;
        page.drawText(text, { x: 50, y, size: 12, color: rgb(0, 0, 0) });

        // กำหนดตำแหน่ง y สำหรับบรรทัดถัดไป
        y -= 20;
    });

    // บันทึกราคารวมลงในเอกสาร PDF
    const totalPriceText = `ราคารวม: ${total.innerText}`;
    page.drawText(totalPriceText, { x: 50, y, size: 12, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // สร้างลิงก์สำหรับดาวน์โหลดเอกสาร PDF

});