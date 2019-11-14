const { prompt } = require("inquirer");
const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("./client_secret.json");
const invoiceGenerator = require("./invoiceGenerator");

const currentYear = new Date().getFullYear();

prompt([
  {
    type: "list",
    name: "month",
    message: "Please select a month",
    choices: [
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
    ]
  },
  {
    type: "number",
    name: "year",
    message: `Please enter a year (leave blank if ${currentYear})`,
    default: currentYear
  }
]).then(answers => {
  console.log(answers);
  const period = `${answers.month}-${answers.year}`

  var doc = new GoogleSpreadsheet(
    "1gyuDDAeSocdMyIGxKoRZEkk-WlVkC68I_93xrJw80Ws"
  );
  let sheet;
  doc.useServiceAccountAuth(creds, err => {
    if (err) console.error(err);
    doc.getInfo((err, info) => {
      if (err) throw err;

      sheet = info.worksheets.reduce((prevVal, currVal) => {
        if (currVal.title === 'Student Directory') {
          return currVal
        }
        else {
          return prevVal
        }
      })
      doc.getRows(sheet.id, (err, rows) => {
        const data = []
        rows.map((i) => {
          const cuota = i.cuota.replace('€', '')
          data.push({
            name: `${i.nombre} ${i.apellido}`,
            amount: cuota
          })
        })
        invoiceGenerator(data, period)
      })
    })



  });

});
