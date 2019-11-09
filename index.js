const { prompt } = require("inquirer");
const GoogleSpreadsheet = require("google-spreadsheet");
const creds = require("./client_secret.json");
const app = require("./app");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Prompt for a date
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
      "deciembre"
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

  // Access the Google Spreadsheet
  var doc = new GoogleSpreadsheet(
    "1gyuDDAeSocdMyIGxKoRZEkk-WlVkC68I_93xrJw80Ws"
  );
  doc.useServiceAccountAuth(creds, err => {
    if (err) console.error(err);
    app(doc, period)
    
  });



  // Map through the array and generate an invoice for each
});
