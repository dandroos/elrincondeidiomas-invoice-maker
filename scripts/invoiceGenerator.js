const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const {
  populateAddress,
  populateDate,
  populateBody,
  populateFooter
} = require("./populate");
const settings = require("../settings.json");

module.exports = (data, period) => {
  const doc = new PDFDocument({ size: "A4", autoFirstPage: false });
  const filePath = `facturas - ${period}`;
  doc.pipe(fs.createWriteStream(filePath));

  const printPeriod = period.replace("-", " ");

  data.map(i => {
    doc.addPage();

    doc
      .image(
        path.join(__dirname, `../images/${settings.logo_filename}`),
        70,
        50,
        {
          width: 180
        }
      )
      .font(settings.font);

    populateAddress(doc);

    doc.moveDown().fontSize(12);

    populateDate(doc);

    doc.moveDown(2).fontSize(12);

    populateBody(doc, i, printPeriod);

    doc.moveDown(9).fontSize(10);
    populateFooter(doc);
    doc.fontSize(12);
  });
  doc.end();
};
