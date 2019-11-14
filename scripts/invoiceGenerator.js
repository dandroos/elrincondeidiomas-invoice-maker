const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const numberGenerator = require("./invoiceNumberGenerator");

module.exports = (data, period) => {
  const doc = new PDFDocument({ size: "A4", autoFirstPage: false });
  const filePath = `facturas - ${period}`;
  doc.pipe(fs.createWriteStream(filePath));

  const printPeriod = period.replace("-", " ");

  data.map((i, ind) => {
    const fontRegular = "Helvetica";
    const fontBold = `${fontRegular}-Bold`;
    doc.addPage();
    const amount = parseInt(i.amount);

    doc.image(path.join(__dirname, "../images/logo1.png"), 70, 50, {
      width: 180
    });

    doc.font(fontRegular);

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

    doc.fontSize(12);
    doc.text(i.name);

    doc.moveDown(2);

    doc
      .font(fontBold)
      .fontSize(14)
      .text(`FACTURA`, {
        align: "center",
        underline: true
      });

    doc.moveDown(2);
    doc
      .font(fontRegular)
      .fontSize(10)
      .text(`Número de factura: ${numberGenerator(12)}`)
      .moveDown(2);
    doc.fontSize(12).font(fontBold);

    doc
      .text("Descripción", { continued: true })
      .text("Precio", { align: "right" });
    doc.image(path.join(__dirname, "../images/thinline.png"), {
      width: doc.page.width - doc.page.margins.left * 2,
      height: 0.5,
      align: "center"
    });
    doc.moveDown();
    doc.font(fontRegular);
    doc
      .text(`Clases de inglés por el mes de ${printPeriod}`, {
        continued: true
      })
      .text(`${amount.toFixed(2)}€`, { align: "right" });

    doc.moveDown(9);

    doc.fontSize(10);

    doc
      .font(fontRegular)
      .text("QUEDAMOS A LA ESPERA DE SUS PRONTAS NOTICIAS")
      .moveDown()
      .text("P.D: LOS PAGOS DEBERAN REALIZARSE DEL 1 AL 5 DE CADA MES")
      .moveDown()
      .text("SE PUEDEN REALIZAR MEDIANTE:")
      .moveDown()
      .text("  - EN EFECTIVO")
      .moveDown()
      .text("  - TARJETA BANCARIA")
      .moveDown()
      .text("  - TRANSFERENCIA BANCARIA EN LA CUENTA")
      .text("      ES41-2038-7314-6160-0027-7221")
      .fontSize(8)
      .text(
        "        EN LA TRANSFERENCIA BANCARIA DEBERA APARECER EL NOMBRE DEL ALUMNO Y MES DE PAGO"
      )
      .fontSize(12);
  });
  doc.end();
};
