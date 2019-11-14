const moment = require("moment");
const settings = require("../settings.json");
const path = require("path");
const numberGenerator = require("./invoiceNumberGenerator");

module.exports = {
  populateAddress(doc) {
    doc.text(settings.school, { align: "right" });
    doc.text(settings.address1, { align: "right" });
    doc.text(settings.address2, { align: "right" });
    doc.text(settings.city, { align: "right" });
    doc.text(settings.postcode, { align: "right" });
    doc.moveDown();
    doc.text(settings.tel, { align: "right" });
    doc.moveDown();
    doc.fontSize(10);
    doc.text(settings.director, { align: "right" });
    doc.text(settings.nie, { align: "right" });
  },
  populateDate(doc) {
    const date = new Date();
    moment.locale("es");
    doc.text(moment(date).format("LL"), { align: "right" });
  },
  populateBody(doc, student, printPeriod) {
    const amount = parseInt(student.amount);

    doc
      .text(student.name)
      .moveDown(2)
      .font(settings.fontBold)
      .fontSize(14)
      .text(`FACTURA`, {
        align: "center",
        underline: true
      })
      .moveDown(2)
      .font(settings.font)
      .fontSize(10)
      .text(`Número de factura: ${numberGenerator(12)}`)
      .moveDown(2)
      .fontSize(12)
      .font(settings.fontBold)
      .text("Descripción", { continued: true })
      .text("Precio", { align: "right" })
      .image(path.join(__dirname, "../images/thinline.png"), {
        width: doc.page.width - doc.page.margins.left * 2,
        height: 0.5,
        align: "center"
      })
      .moveDown()
      .font(settings.font)
      .text(`Clases de inglés por el mes de ${printPeriod}`, {
        continued: true
      })
      .text(`${amount.toFixed(2)}€`, { align: "right" });
  },
  populateFooter(doc) {
    doc
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
      );
  }
};
