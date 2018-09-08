function mannuallyAssignEditUrlsAndIDs() {
  var formID = 'FormID'; //enter form ID here
  var form = FormApp.openById(FormID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Equipment Reservations');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var urlCol = 14; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  var formResponse = responses[71];
  var timestamps = [], urls = [], resultUrls = [];
  
    var j = 80;
    
    timestamps.push(formResponse.getTimestamp().setMilliseconds(0));
    urls.push(formResponse.getEditResponseUrl()); 
    resultUrls.push([urls[timestamps.indexOf(data[(j-1)][0].setMilliseconds(0))]]);  
    sheet.getRange(j, urlCol).setValues(resultUrls);    
}
function assignEditUrls() {
  var formID = 'FormID'; //enter form ID here
  var form = FormApp.openById(formID);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Equipment Reservations');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var urlCol = 14; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];
  
  for (var i = 79; i < responses.length; i++) {
    timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
    urls.push(responses[i].getEditResponseUrl());
  }
  for (var j = 91; j < data.length; j++) {
    resultUrls.push([urls[timestamps.indexOf(data[j][0].setMilliseconds(0))]]);
  }
  sheet.getRange(92, urlCol, resultUrls.length).setValues(resultUrls);  
}

function assignCalendarEventId(newEventID) {
  var formID = 'FormID'; //enter form ID here
  var form = FormApp.openById(formID);//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Equipment Reservations');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var idCol = 15; // column number where ID's should be populated; A = 1, B = 2 etc    
  
  sheet.getRange(data.length, idCol).setValue(newEventID);  
  
}

function CheckIfResponseIdExists(item, resStartTime, resEndTime, namedValues, values){ 
// need to figure out if edit URL is same as one that already exists.  response.getId()
//Figure out how to get a response id and compare it to ones tha
  var formID = 'FormID'; //enter form ID here
  var form = FormApp.openById(formID);//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ResponseIDs');
  var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Equipment Reservations');//Change the sheet name as appropriate  
  var data = sheet.getDataRange().getValues();
  var data2 = sheet2.getDataRange().getValues();
  var formResponses = form.getResponses();
  var formResponse = formResponses[formResponses.length - 1];
  var itemResponses = formResponse.getItemResponses();
  var itemResponse = itemResponses[0];
  var lastRow = sheet.getLastRow();
  var lastRow2 = sheet2.getLastRow(); 
  var lastResponseID = formResponse.getId();
  var lastEditResponseURL = formResponse.getEditResponseUrl();
  var lastRespondentEmail = formResponse.getRespondentEmail();
  
    
  //Check for ID
  var responseIdExits = 'No';
  for (var i = 0; i < lastRow + 1; i++) {
    //Logger.log('Response Id Value: ' + data[i]);
    if(data[i] == lastResponseID){ //[0] because column A
      responseIdExits = 'Yes';
                          }
  }
  
  if(responseIdExits == 'Yes'){ //[0] because column A
      Logger.log('Entered Yes Loop');
      for (var j = 0; j < lastRow2; j++) {
      //Logger.log('Edit response Email lastEditResponseURL: ' + data2[j][13]);
      if(data2[j][13] == lastEditResponseURL){ //[13] because column N
      var itemRow = j+1;
                          }
      }
      var resItem = sheet2.getRange('E' + (itemRow)).getValue();
      var resStart = sheet2.getRange('C' + (itemRow)).getValue();
      var resEnd = sheet2.getRange('D' + (itemRow)).getValue();
      var resOriginator = sheet2.getRange('K' + (itemRow)).getValue();
      SendResponseEditEmail (lastRespondentEmail, lastEditResponseURL, namedValues, values, resItem, resStart, resEnd, resOriginator);
      EditCalendarEvent (lastEditResponseURL);
                          }
  
   if(responseIdExits == 'No'){ //[0] because column A
      Logger.log('Entered No Loop');
      assignSingleEditUrl();
      CheckCalendarEvents(item, resStartTime, resEndTime, namedValues, values);
      sheet.getRange('A' + (lastRow + 1)).setValue(lastResponseID);
                          }
  
  //Logger.log('ResplnseIdExists: ' + responseIdExits);
  //Logger.log('itemResponse: ' + itemResponse);
  //Logger.log('last formResponse timestamp: ' + formResponse.getTimestamp());
  //Logger.log('last formResponse ID: ' + formResponse.getId());
  //for (var i = 0; i < formResponses.length; i++) {
  //var formResponse = formResponses[i];
  //var itemResponses = formResponse.getItemResponses();
  //for (var j = 0; j < itemResponses.length; j++) {
    //var itemResponse = itemResponses[j];
    //Logger.log('Response #%s to the question "%s" was "%s"',
        //(i + 1).toString(),
        //itemResponse.getItem().getTitle(),
        //itemResponse.getResponse());
  //}
//}
}


function assignSingleEditUrl() {
  var form = FormApp.openById('1mezt3yHLctSxa9qHsH-i_lPpIwruBRHHyeUCpaEo31o');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Equipment Reservations');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var urlCol = 14; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];  
    timestamps.push(responses[(responses.length-1)].getTimestamp().setMilliseconds(0));
    urls.push(responses[(responses.length-1)].getEditResponseUrl()); 
    resultUrls.push([urls[timestamps.indexOf(data[(data.length-1)][0].setMilliseconds(0))]]);  
    sheet.getRange(data.length, urlCol).setValues(resultUrls);  
  
}
