const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = (data, period) => {
  const doc = new PDFDocument({ size: "A4", autoFirstPage: false });
  const filePath = `facturas - ${period}`;
  doc.pipe(fs.createWriteStream(filePath));
  // const folderPath = path.join(__dirname, `facturas - ${period}`);

  // fs.mkdirSync(folderPath);

  const printPeriod = period.replace("-", " ");
  // Font variables
  
  let int = 0;
  data.map((i, ind) => {
    const fontRegular = "Helvetica";
  const fontBold = `${fontRegular}-Bold`;
    doc.addPage();
    const amount = parseInt(i.amount);
    int++
    

    doc.image(path.join(__dirname, "logo1.png"), 70, 50, {
      width: 180
    });

    //     // Declare start font
    doc.font(fontRegular);

    //     // Populate company name, address and contact details
    doc.text("El Rincón de Idiomas", { align: "right" });
    doc.text("Calle Alcaldes Mayores, 1", { align: "right" });
    doc.text("6 Majada Marcial", { align: "right" });
    doc.text("Puerto del Rosario", { align: "right" });
    doc.text("35600", { align: "right" });
    doc.moveDown();
    doc.text("636 32 34 41", { align: "right" });
    doc.moveDown();
    doc.fontSize(10);
    doc.text("Directora: Joanne Bowker", { align: "right" });
    doc.text("X2016168B", { align: "right" });

    doc.moveDown();
    doc.fontSize(12);

    // Generate and populate date
    const date = new Date();
    const spanishMonths = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];
    const str = `${date.getDate()} de ${
      spanishMonths[date.getMonth()]
    } de ${date.getFullYear()}`;

    doc.text(str, { align: "right" });

    doc.moveDown(2);

    // Populate client name and address
    doc.fontSize(12);
    doc.text(i.name);

    doc.moveDown(2);

    // Populate heading
    doc
      .font(fontBold)
      .fontSize(14)
      .text(`FACTURA`, {
        align: "center",
        underline: true
      });

    doc.moveDown(2);
    doc.font(fontRegular)
    .fontSize(10)
    .text(`Número de factura: ${date.getMonth() + 1}${date.getFullYear()}${int}`)
      .moveDown(2);
    doc.fontSize(12).font(fontBold);

    // Invoice area
    doc
      .text("Descripción", { continued: true })
      .text("Precio", { align: "right" });
    doc.image(path.join(__dirname, "thinline.png"), {
      width: doc.page.width - doc.page.margins.left * 2,
      height: 0.5,
      align: "center"
    });
    doc.moveDown();
    doc.font(fontRegular);
    doc
      .text(`Clases de inglés por el mes de ${printPeriod}`, { continued: true })
      .text(`${amount.toFixed(2)}€`, { align: "right" });

    doc.moveDown(4);

    doc.fontSize(10);
   
    doc.moveDown(5);
    doc
      .font(fontRegular)
      .text(
        "QUEDAMOS A LA ESPERA DE SUS PRONTAS NOTICIAS",
      )
      .moveDown()
      .text(
        "P.D: LOS PAGOS DEBERAN REALIZARSE DEL 1 AL 5 DE CADA MES",
      )
      .moveDown()
      .text(
        "SE PUEDEN REALIZAR MEDIANTE:",
      )
      .moveDown()
      .text(
        "  - EN EFECTIVO",
      )
      .moveDown()
      .text("  - TARJETA BANCARIA")
      .moveDown()
      .text("  - TRANSFERENCIA BANCARIA EN LA CUENTA")
      .text("      ES41-2038-7314-6160-0027-7221")
      .fontSize(8)
      .text("        EN LA TRANSFERENCIA BANCARIA DEBERA APARECER EL NOMBRE DEL ALUMNO Y MES DE PAGO")
    //   .moveDown();
    // doc
    //   .fontSize(10)
    //   .text("Gracias por su pago y confianza en nuestra Academia.", {
    //     align: "center"
    //   });
    // doc.moveDown(2);
    .fontSize(12)


  });
  doc.end();
};
