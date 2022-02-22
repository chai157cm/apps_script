// Receive email alert 3 days before subscription auto renew

function emailAlert() {
  
  // today's date
  var today = new Date();
  var todayMonth = today.getMonth() + 1;
  var todayDay = today.getDate();
  var todayYear = today.getFullYear();

  // 3 days later
  var threeDaysFromToday = new Date();
  threeDaysFromToday.setDate(threeDaysFromToday.getDate() + 3);
  var threeDaysMonth = threeDaysFromToday.getMonth() + 1;
  var threeDaysDay = threeDaysFromToday.getDate();
  var threeDaysYear = threeDaysFromToday.getFullYear();
  
  // get data from spreadsheet
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var numRows = 1; // Number of rows to process

  var dataRange = sheet.getRange(startRow, 1, numRows, 999);
  var data = dataRange.getValues();

  // loop through all of the rows
  for (var i=0; i<data.length; i++) {
    var row = data[i];
    
    var nextPaymentDateFormat = Utilities.formatDate(
      new Date(row[7]),
      'JST',
      'yyyy/MM/dd'
    );

  // next payment date information
    var nextPaymentDateMonth = new Date(row[7]).getMonth() + 1;
    var nextPaymentDateDay = new Date(row[7]).getDate();
    var nextPaymentDateYear = new Date(row[7]).getFullYear();

  // check for next payment due 3 days later
    if (
      nextPaymentDateMonth === threeDaysMonth &&
      nextPaymentDateDay === threeDaysDay &&
      nextPaymentDateYear === threeDaysYear
    ) {
      var subject = 'Reminder - subscription auto renew';
      var message =
      ' Item: ' +
      row[0] +
      '\n' +
      ' Vendor: ' +
      row[1] +
      '\n' +
      ' Cost (JPY): ' +
      row[3] +
      '\n' +
      ' Next Payment: ' +
      row[7];
      MailApp.sendEmail('youremail', subject, message);
    }
  } 
}
