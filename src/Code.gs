/**

* Google Sheets Data Entry System
* ---
* Collects structured land-record information
* from a data-entry form and stores each
* submission in a centralized Master Sheet.
*
* Platform:
* * Google Sheets
* * Google Apps Script
*
* Main functions:
* * submitData()
* * clearForm()
**/

// Sheet Names
const FORM_SHEET = "Data Entry Form";
const DATA_SHEET = "Master Sheet";

// Input cell locations used by the data-entry form
const INPUT_CELLS = [
"D5",   // পুরাতন ফাইল নং
"D7",   // নতুন ফাইল নং
"D9",   // মৌজা
"D11",  // থানা
"D15",  // দলিলের ধরণ
"D17",  // গ্রহিতা কোঃ নাম
"D19",  // দলিল নম্বর
"D21",  // দলিলের তারিখ
"D25",  // আর.এস খতিয়ান
"H25",  // এস.এ খতিয়ান
"D27",  // আর.এস দাগ
"H27",  // এস.এ দাগ
"D29",  // ক্রয়কৃত জমি (শতাংশ)
"H29",  // দাগে মোট জমি (শতাংশ)
"D33",  // দাতার নাম
"D35",  // গ্রহিতার নাম
"D37"   // মাধ্যমের নাম
];

/**

* Submits form data to the Master Sheet.
  */
  function submitData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName(FORM_SHEET);
  const dataSheet = ss.getSheetByName(DATA_SHEET);

// Verify required sheets exist
if (!formSheet || !dataSheet) {
SpreadsheetApp.getUi().alert(
"Error: Sheet tab names do not match!"
);
return;
}

// Generate the next serial number
const lastRow = dataSheet.getLastRow();
const nextSlNo =
lastRow > 1
? dataSheet.getRange(lastRow, 1).getValue() + 1
: 1;

// Read values from form fields
const puratonFile = formSheet.getRange("D5").getValue();
const notunFile = formSheet.getRange("D7").getValue();
const mouza = formSheet.getRange("D9").getValue();
const thana = formSheet.getRange("D11").getValue();
const dolilDhoron = formSheet.getRange("D15").getValue();
const grohitaCoName = formSheet.getRange("D17").getValue();
const dolilNo = formSheet.getRange("D19").getValue();
const dolilTarikh = formSheet.getRange("D21").getValue();
const rsKhotian = formSheet.getRange("D25").getValue();
const saKhotian = formSheet.getRange("H25").getValue();
const rsDag = formSheet.getRange("D27").getValue();
const saDag = formSheet.getRange("H27").getValue();
const kroyJomi = formSheet.getRange("D29").getValue();
const motJomi = formSheet.getRange("H29").getValue();
const datarName = formSheet.getRange("D33").getValue();
const grohitarName = formSheet.getRange("D35").getValue();
const madhyamerName = formSheet.getRange("D37").getValue();

// Basic validation
if (!puratonFile && !notunFile && !dolilNo) {
SpreadsheetApp.getUi().alert(
"Please enter data in the form before submitting."
);
return;
}

// Map form values to Master Sheet columns A:R
const rowData = [
nextSlNo,         // A: ক্রমিক নং
puratonFile,      // B: পুরাতন অফিস ফাইল নং
notunFile,        // C: নতুন অফিস ফাইল নং
mouza,            // D: মৌজা
thana,            // E: থানা
dolilDhoron,      // F: দলিলের ধরণ
grohitaCoName,    // G: গ্রহিতা কোঃ নাম
saKhotian,        // H: এস.এ খতিয়ান
rsKhotian,        // I: আর.এস খতিয়ান
saDag,            // J: এস.এ দাগ
rsDag,            // K: আর.এস দাগ
motJomi,          // L: দাগে মোট জমি
kroyJomi,         // M: ক্রয়কৃত জমি (শতাংশ)
dolilNo,          // N: দলিল নম্বর
dolilTarikh,      // O: দলিলের তারিখ
grohitarName,     // P: গ্রহিতার নাম
datarName,        // Q: দাতার নাম
madhyamerName     // R: মাধ্যমের নাম
];

// Add the record to the Master Sheet
dataSheet.appendRow(rowData);

// Reset the form
clearForm();

SpreadsheetApp.getUi().alert(
"Data successfully added to Master Sheet!"
);
}

/**

* Clears all input fields in the data-entry form.
  */
  function clearForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName(FORM_SHEET);

INPUT_CELLS.forEach(cell => {
formSheet.getRange(cell).clearContent();
});
}
