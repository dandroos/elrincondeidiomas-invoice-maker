const invoiceGenerator = require("./invoiceGenerator");

module.exports = (doc, period) => {
  doc.getInfo((err, info) => {
    const sheets = info.worksheets;
    sheets.map(sheet => {
      if (sheet.title == period) {
        doc.getRows(sheet.id, (err, rows) => {
          const data = [];
          rows.map(i => {
            // Pull through the names and amounts
            // Put them into an object
            // Push the objects into an array
            data.push({
              name: i.names,
              amount: i.amount
            });
          });
          invoiceGenerator(data, period);
        });
      }
    });
  });
};
