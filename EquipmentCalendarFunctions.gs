function runCalendarCheck()      {
  var calid = returnCalendarID('Sting Passive');
  var calendar = CalendarApp.getCalendarById(calid);
  var events = calendar.getEventById('NGtyaDQxdTltNDdycmE2MWwxaWpxaGk2ZmsgZG9pLmdvdl9qOTE0ZmRyZ2M5NGVwYmw2OXU4bDBvYXZvZ0Bn@google.com');
  var title = events.getTitle();
  Logger.log('Title Man Edit: ' + title);
  ManuallyEditCalendarEvent ('80',calendar,events)

}


function returnCalendarID(item)  { 
  //var item = 'Test 1';
  var ss = SpreadsheetApp.openById('1rLBxcW9RragIOwkh33L-rdPfE1LVGO_kyWtmQWeoyDo');  //Set ID of lookup table here
  var sheet = ss.getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  
  for(var i = 0; i<data.length;i++){
    if(data[i][0] == item){ //[0] because column A
      Logger.log('Row: ' + (i+1));
      var itemRow = i+1;
                          }
                                    }
  var calendarID = sheet.getRange(itemRow,2).getValue();  //2 because column B                               
  Logger.log('Calendar ID: ' + calendarID);
  return calendarID;
}

function returnCalendarURL(item)  { 
  //var item = 'Test 1';
  var ss = SpreadsheetApp.openById('1rLBxcW9RragIOwkh33L-rdPfE1LVGO_kyWtmQWeoyDo');  //Set ID of lookup table here
  var sheet = ss.getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  
  for(var i = 0; i<data.length;i++){
    if(data[i][0] == item){ //[0] because column A
      Logger.log('Row: ' + (i+1));
      var itemRow = i+1;
                          }
                                    }
  var calendarURL = sheet.getRange(itemRow,3).getValue();  //2 because column B                               
  Logger.log('Calendar URL: ' + calendarURL);
  return calendarURL;
}



function CheckCalendarEvents(item, resStartTime, resEndTime, namedValues, values) { 
  var date = new Date();
  var calid = returnCalendarID(item); 
  var calURL = returnCalendarURL(item);
  var calendar = CalendarApp.getCalendarById(calid)
  var description = calendar.getDescription();
  var name = calendar.getName();
  
  //var events = calendar.getEventsForDay(date);
  var events = calendar.getEvents(new Date(resStartTime), new Date(resEndTime));  
  Logger.log('Events: ' + events);
  
  
  //!!!If there is no conflicting reservation do the following:
  if (events == 0) {
  Logger.log('There are no event conflicts for this day');
    
    var addTime = new Date(resEndTime + (12 * 60 * 60 * 1000));
    Logger.log('addTime test: ' + addTime);
    
  var newEventTitle = values[10] + ", " +  values[4]; 
  var newEvent = calendar.createEvent(newEventTitle, new Date(resStartTime), new Date(resEndTime));//new Date(EndDate.getTime()+3600000*13));// Add 13hours to date so that the final day selected shows into the next day and not 12am
  //var newEvent = calendar.createEvent('This is an event test', new Date('June 13, 2018 20:00:00 UTC'), new Date('June 18, 2018 20:00:00 UTC'));
  
  //Assign new event ID so event can be edited if form response is edited.   
 var newEventID = newEvent.getId()
 Logger.log('New event Id Value: ' + newEventID);
 assignCalendarEventId(newEventID);  
    
    
    var description = "<a href='https://docs.google.com/spreadsheets/d/1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k/edit?usp=sharing' title='Equipment Reservation Sheet' target='_blank'>View ALL Equipment Reservation Responses</a>" + "<br>";     
    description += "Reservation Received :: " + values[0] + "<br>";
    description += "Reservation Originator's Email :: " + values[1] + "<br>";
    description += "Property Check Out Date :: " + values[2] + "<br>";
    description += "Property Return Date :: " + values[3] + "<br>";
    description += "Equipment Being Reserved :: " + values[4] + "<br>";
    description += "Project Number :: " + values[5] + "<br>";  
    description += "Project Chief's email :: "+ values[6] + "<br>";
    description += "Admin. Tech. :: " + values[7] + "<br>";
    description += "Admin. Tech's email :: " + values[9] + "<br>";
    description += "Person(s) responsible for equipment in the field. :: " + values[10] + "<br>";
    description += "Field Location(s) :: " + values[11] + "<br>";
    description += "Additional Comments / Notes :: " + values[12] + "<br>";
  
  newEvent.setDescription(description);
  newEvent.setLocation(values[11]);
  SendReservationConfirmationEmail (namedValues, values, calURL);  
  Logger.log('Called Send Confirmation Email');
                   }
  
  
  //!!!If there is a conflicting reservation, do the following:
  if (events != 0) { 
  var eventID = events[0].getId();
  var startDate = events[0].getStartTime();
  var endDate = events[0].getEndTime();
  
  //var id = getId(events)
  var startTime = events.getDateCreated;
  //var endTime = 
   Logger.log('!!! There are event conflicts with this reservation !!!');
  Logger.log('Calendar Name: ' + name);
    Logger.log('Calendar URL: ' + calURL);
  Logger.log('Description: ' + description);
  Logger.log('Events: ' + events[0]);
  Logger.log('Event ID: ' + eventID);
  Logger.log('Number of events: ' + events.length);
  Logger.log('This event begins: ' + startDate);
  Logger.log('This event ends: ' + endDate);
  SendReservationConflictEmail (namedValues, values, calURL, startDate, endDate);
  Logger.log('Called Send Rejection Email ');
  var editURL = values[14];  
  deleteBogusRecord(namedValues, values, editURL);  //DELETE NEW RECORD created that is a conflict!!!!!!
                    }
}


  function deleteBogusRecord(namedValues, values, editURL) {
  var ss = SpreadsheetApp.openById('1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('Equipment Reservations');
  var data = sheet.getDataRange().getValues();
  Logger.log('EditURL: ' + editURL);
  
    for(var i = 0; i<data.length;i++){
    if(data[i][14] == editURL){ //[14] because column N
      //Logger.log('Row: ' + (i+1));
      var itemRow = i+1;
                          }
                                    }
    sheet.deleteRow(itemRow);                              
    Logger.log('Bogus Row Deleted: ' + itemRow);
  }


  
  function deleteRow() {
  var ss = SpreadsheetApp.openById('1RtZp-UTncbtt1gZI0P-3rCtO_WCTfK9mU5tC7a2Qcvw');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('Equipment Reservations');
  sheet.deleteRow('9');  
  }

function EditCalendarEvent (lastEditResponseURL) {

  var ss = SpreadsheetApp.openById('1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('Equipment Reservations');
  var data = sheet.getDataRange().getValues();
  
    for(var i = 0; i<data.length;i++){
      //Logger.log('Value: ' + data[i][13])
    if(data[i][13] == lastEditResponseURL){ //[14] because column N
      //Logger.log('Calendar Event to Edit Row: ' + (i+1));
      var itemRow = i+1;
                          }
                                    }
    
  var calEventID = sheet.getRange('O' + (itemRow)).getValue(); 

  Logger.log('Edit Calendar to change: ' + calEventID + ' on row: ' + itemRow);

  var item = sheet.getRange('E' + (itemRow)).getValue();
  var calid = returnCalendarID(item);
  var calendar = CalendarApp.getCalendarById(calid)
  var calEvent = calendar.getEventById(calEventID)
  var resStartTime = new Date(sheet.getRange('C' + (itemRow)).getValue())
  var resEndTime = new Date(sheet.getRange('D' + (itemRow)).getValue())
  Logger.log('Edit Calendar Event Title: ' + calEvent.getTitle() );
  
  var addTime = new Date(resEndTime + (12 * 60 * 60 * 1000));//This is not working need to figure out how to add time!!! or make all day event?
  Logger.log('!!!!!!addTime test!!!!!!!: ' + addTime);
    
  var newEventTitle = sheet.getRange('K' + (itemRow)).getValue() + ", " +  sheet.getRange('E' + (itemRow)).getValue(); 
  
  calEvent.setTitle(newEventTitle);
  calEvent.setTime(resStartTime, resEndTime); //May need to check to see if there is a conflict after edit 
  
 //Description of event created below   
 var description = "<a href='https://docs.google.com/spreadsheets/d/1RtZp-UTncbtt1gZI0P-3rCtO_WCTfK9mU5tC7a2Qcvw/edit?usp=sharing' title='Equipment Reservation Sheet' target='_blank'>View ALL Equipment Reservation Responses</a>" + "<br>";     
    description += "Reservation Received :: " + sheet.getRange('A' + (itemRow)).getValue() + "<br>";
    description += "Reservation Originator's Email :: " + sheet.getRange('B' + (itemRow)).getValue() + "<br>";
    description += "Property Check Out Date :: " + sheet.getRange('C' + (itemRow)).getValue() + "<br>";
    description += "Property Return Date :: " + sheet.getRange('D' + (itemRow)).getValue() + "<br>";
    description += "Equipment Being Reserved :: " + sheet.getRange('E' + (itemRow)).getValue() + "<br>";
    description += "Project Number :: " + sheet.getRange('F' + (itemRow)).getValue() + "<br>";  
    description += "Project Chief :: "+ sheet.getRange('G' + (itemRow)).getValue() + "<br>";
    description += "Project Chief's email :: "+ sheet.getRange('H' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech. :: " + sheet.getRange('I' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech's email :: " + sheet.getRange('J' + (itemRow)).getValue() + "<br>";
    description += "Person(s) responsible for equipment in the field. :: " + sheet.getRange('K' + (itemRow)).getValue() + "<br>";
    description += "Field Location(s) :: " + sheet.getRange('L' + (itemRow)).getValue() + "<br>";
    description += "Additional Comments / Notes :: " + sheet.getRange('M' + (itemRow)).getValue() + "<br>";
  
  calEvent.setDescription(description);
  calEvent.setLocation(sheet.getRange('L' + (itemRow)).getValue());

}

function ManuallyEditCalendarEvent () {
  
  var itemRowSS = 84;//Row is what is stated in sheet exactly - change this row to exicute code on any record.  85
  var itemRow = (itemRowSS - 1);
  var ss = SpreadsheetApp.openById('1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('Equipment Reservations');
  var data = sheet.getDataRange().getValues();
  //Logger.log('Value Test: ' + data[1][5]); //Row starts at one, Column starts at zero.
  var resStartTime = new Date(sheet.getRange('C' + (itemRow)).getValue());
  var resEndTime = new Date(sheet.getRange('D' + (itemRow)).getValue());
  var resItem = data[itemRow][4];
  Logger.log ('resItem: ' + resItem);
  var calID = returnCalendarID(resItem); 
  var calendar = CalendarApp.getCalendarById(calID);
  var calEvents = calendar.getEvents(resStartTime, resEndTime); 
  var calEvent = calEvents[0];
  Logger.log ('calEvent: ' + calEvent);
  var newEventTitle = sheet.getRange('K' + (itemRow)).getValue() + ", " +  sheet.getRange('E' + (itemRow)).getValue(); 
  
  calEvent.setTitle(newEventTitle);
  calEvent.setAllDayDates(resStartTime, resEndTime); //May need to check to see if there is a conflict after edit 
  
 //Description of event created below   
 var description = "<a href='https://docs.google.com/spreadsheets/d/1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k/edit?usp=sharing' title='Equipment Reservation Sheet' target='_blank'>View ALL Equipment Reservation Responses</a>" + "<br>";     
    description += "Reservation Received :: " + sheet.getRange('A' + (itemRow)).getValue() + "<br>";
    description += "Reservation Originator's Email :: " + sheet.getRange('B' + (itemRow)).getValue() + "<br>";
    description += "Property Check Out Date :: " + sheet.getRange('C' + (itemRow)).getValue() + "<br>";
    description += "Property Return Date :: " + sheet.getRange('D' + (itemRow)).getValue() + "<br>";
    description += "Equipment Being Reserved :: " + sheet.getRange('E' + (itemRow)).getValue() + "<br>";
    description += "Project Number :: " + sheet.getRange('F' + (itemRow)).getValue() + "<br>";  
    description += "Project Chief :: "+ sheet.getRange('G' + (itemRow)).getValue() + "<br>";
    description += "Project Chief's email :: "+ sheet.getRange('H' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech. :: " + sheet.getRange('I' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech's email :: " + sheet.getRange('J' + (itemRow)).getValue() + "<br>";
    description += "Person(s) responsible for equipment in the field. :: " + sheet.getRange('K' + (itemRow)).getValue() + "<br>";
    description += "Field Location(s) :: " + sheet.getRange('L' + (itemRow)).getValue() + "<br>";
    description += "Additional Comments / Notes :: " + sheet.getRange('M' + (itemRow)).getValue() + "<br>";
  
  
  calEvent.setDescription(description);
  calEvent.setLocation(sheet.getRange('L' + (itemRow)).getValue());

}

function manuallyAddEventAddedToSpreadSheet (){
  
  var itemRowSS = 83;//Row is what is stated in sheet exactly - change this row to exicute code on any record.  85
  var itemRow = (itemRowSS);
  var ss = SpreadsheetApp.openById('1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('Equipment Reservations');
  var data = sheet.getDataRange().getValues();
  //Logger.log('Value Test: ' + data[1][5]); //Row starts at one, Column starts at zero.
  var resStartTime = new Date(sheet.getRange('C' + (itemRow)).getValue());
  var resEndTime = new Date(sheet.getRange('D' + (itemRow)).getValue());
  var resItem = data[itemRow][4];
  Logger.log ('resItem: ' + resItem);
  var calID = returnCalendarID(resItem); 
  var calendar = CalendarApp.getCalendarById(calID);
  var newEventTitle = sheet.getRange('K' + (itemRow)).getValue() + ", " +  sheet.getRange('E' + (itemRow)).getValue(); 
  var calEvent = calendar.createEvent(newEventTitle, new Date(resStartTime), new Date(resEndTime));
  calEvent.setAllDayDates(resStartTime, resEndTime); //May need to check to see if there is a conflict after edit 
  
 //Description of event created below   
 var description = "<a href='https://docs.google.com/spreadsheets/d/1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k/edit?usp=sharing' title='Equipment Reservation Sheet' target='_blank'>View ALL Equipment Reservation Responses</a>" + "<br>";     
    description += "Reservation Received :: " + sheet.getRange('A' + (itemRow)).getValue() + "<br>";
    description += "Reservation Originator's Email :: " + sheet.getRange('B' + (itemRow)).getValue() + "<br>";
    description += "Property Check Out Date :: " + sheet.getRange('C' + (itemRow)).getValue() + "<br>";
    description += "Property Return Date :: " + sheet.getRange('D' + (itemRow)).getValue() + "<br>";
    description += "Equipment Being Reserved :: " + sheet.getRange('E' + (itemRow)).getValue() + "<br>";
    description += "Project Number :: " + sheet.getRange('F' + (itemRow)).getValue() + "<br>";  
    description += "Project Chief :: "+ sheet.getRange('G' + (itemRow)).getValue() + "<br>";
    description += "Project Chief's email :: "+ sheet.getRange('H' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech. :: " + sheet.getRange('I' + (itemRow)).getValue() + "<br>";
    description += "Admin. Tech's email :: " + sheet.getRange('J' + (itemRow)).getValue() + "<br>";
    description += "Person(s) responsible for equipment in the field. :: " + sheet.getRange('K' + (itemRow)).getValue() + "<br>";
    description += "Field Location(s) :: " + sheet.getRange('L' + (itemRow)).getValue() + "<br>";
    description += "Additional Comments / Notes :: " + sheet.getRange('M' + (itemRow)).getValue() + "<br>";
  
  
  calEvent.setDescription(description);
  calEvent.setLocation(sheet.getRange('L' + (itemRow)).getValue());
}
