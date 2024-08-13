// Function to handle GET requests (optional)
function doGet(e) {
  return ContentService.createTextOutput("Web App is running and ready to accept form submissions.");
}

// Function to handle POST requests (form submissions)
function doPost(e) {
  try {
    Logger.log(JSON.stringify(e));  // Log the entire event object to see what's coming in
    var params = e.parameter;

    // Replace 'YOUR_SPREADSHEET_ID' with the actual Spreadsheet ID
    var ss = SpreadsheetApp.openById("Enter your Spreadsheet ID");
    var sheet = ss.getSheetByName("Sheet1");

    // Append the form data to the spreadsheet
    sheet.appendRow([
      params.fname, 
      params.lname, 
      params.email, 
      params.phone, 
      params.service, 
      params.message, 
      new Date()  // Add the current timestamp
    ]);

    return ContentService
            .createTextOutput(JSON.stringify({"result":"success", "data": JSON.stringify(e.parameter) }))
            .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error.message);
    return ContentService
            .createTextOutput(JSON.stringify({"result":"error", "message": error.message }))
            .setMimeType(ContentService.MimeType.JSON);
  }
}
