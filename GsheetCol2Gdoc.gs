function pushQuestionResponses (){
 //Created by Phil Brown (pbrown@usgs.gov) 9/6/18
 //Function call to populate Gdocs from Gsheet values
  UpdateQuestionResponseDocs('1dJ55jokEUXr_XV34stTgLCN75Ue_61r1Nxvx_JvUbX8', 2,"What are the 3 most important things to you that should be preserved at G3, and why?");
  UpdateQuestionResponseDocs('1MXfaHh9rLNlkClP1d8DhHgbT1B-gfN7aJKR_d4If74Q', 3,"What are the top 3 things to change at G3, and why?");
  UpdateQuestionResponseDocs('16SrD4RWrHnwuc29e85YWenCBQ1pt7Mtu0gRC0XxpZcU', 4, "What do most hope a Center Director can accomplish for you?"); 
  UpdateQuestionResponseDocs('1MCKXcD6rwdILg6EUJTHoDN-kFF8n9_pWsrKK1xvcbPU', 5, "What are you most concerned a Center Director might do?"); 
  UpdateQuestionResponseDocs('11Uwwm_g-ADssuee2NzRNZv5W1mgyQrX8iHwga9aFyt8', 6, "What advice do you have for me in my role as Center Director?");
}

function UpdateQuestionResponseDocs(docID, col, question) {
  //Created by Phil Brown (pbrown@usgs.gov) 9/6/18
  //Function outputs column values from an active Gsheet to an existing Gdoc
  //Function parameters:
  //var docID = "1dJ55jokEUXr_XV34stTgLCN75Ue_61r1Nxvx_JvUbX8"; // This is the Gdoc ID. For example, if your URL Looks like this: https://docs.google.com/document/d/1SDTSW2JCItWMGkA8cDZGwZdAQa13sSpiYhiH-Kla6VA/edit, THEN the ID would be 1SDTSW2JCItWMKkA8cDZGwZdAQa13sSpiYhiH-Kla6VA
  //var col = 3; //this is the column to be read for output to the Gdoc
  //var question = "Would you like to play a game?"; //Text to be posted as a heading to the Gdoc
  var date = new Date();  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var doc = DocumentApp.openById(docID);
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(2, col, (lastRow-1), 1).getValues();// get data - Row, Col, NumRows, NumCol
  var body = doc.getBody();
    body.clear();//Clear Document Body
    
  var title = doc.appendParagraph(question)
    title.setItalic(true);
    title.setFontSize(14);
    doc.appendParagraph("");
  
  var j = 1
  for (var i in data){
    var values = data[i];
    var postNum = doc.appendParagraph("Post " + j + ":");
    postNum.setItalic(false);
    postNum.setFontSize(12);
    postNum.setBold(true);
    
    var postText = doc.appendParagraph(values)
    postText.setBold(false);
    
    j = j+1;
    doc.appendHorizontalRule()
    doc.appendParagraph("")
  }
    doc.saveAndClose();
}
