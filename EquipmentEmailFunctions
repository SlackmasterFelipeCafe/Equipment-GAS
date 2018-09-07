function SendReservationConfirmationEmail(namedValues, values, calURL) {
   
    var emailGGGSC = "pbrown@usgs.gov,blburton@usgs.gov,mhpowers@usgs.gov"; //add multiple people seperated by a comma, no space, within the quotes 
    var emailOriginator = values[1];
    Logger.log('emailOriginator: ' + emailOriginator)   
    var emailAddress = emailGGGSC + "," + emailOriginator;    
    var message = "A new GGGSC Equipment Reservation has been made" + " by " + values[10] + " for the " + values [4] + " on " + values[0] + "." + "\n";
    
  //Code below loops through e.namedValues object resulting from the form on-submit event - this presents the results in an order all mixed up compared to the Google Sheet/Form layout.  
  
       //for(var field in e.namedValues) {
           //message += field + ' :: '
             //+ e.namedValues[field].toString() + "\n\n" + "\n\n";
         //}
  
  //As a work around for the named values listing I'll hard-code a custom listing based upon wether or not there are repeat destinations.
     message += "\n\n" + "To view the Google Calendar populated by this Google Form response, please visit: " + "\n" 
    + calURL+ "\n\n";  
    message += "To view the Google Sheet populated by this Google Form response, please visit: " + "\n" 
    + "https://docs.google.com/spreadsheets/d/1plYcPVnKlA7rwfpv3a219ek3_YQMWwyKuLe3NBCaV9k/edit?usp=sharing" + "\n\n";    
    message += "You are receiving this automatic email because you are a GGGSC equipment manager or have been identified as a contact for this Equipment Reservation."+ "\n\n";    
    message += "Equipment reservation responses are listed below:"+ "\n";
    message += "     Reservation Received :: " + values[0] + "\n";
    message += "     Originator's email :: " + values[1] + "\n";
    message += "     Property Check Out Date :: " + values[2] + "\n";
    message += "     Property Return Date :: " + values[3] + "\n";
    message += "     Equipment Being Reserved :: " + values[4] + "\n";
    message += "     Project Number :: " + values[5] + "\n";
    message += "     Project Chief's email :: "+ values[6] + "\n";
    message += "     Admin. Tech. :: " + values[7] + "\n";  
    message += "     Admin. Tech's email :: " + values[9] + "\n";
    message += "     Person(s) responsible for equipment in the field. :: " + values[10] + "\n";
    message += "     Field Location(s) :: " + values[11] + "\n";
    message += "     Additional Comments / Notes :: " + values[12] + "\n\n";
    message += "Any replies to this email will be sent to Phil Brown, pbrown@usgs.gov; please contact Phil with any questions or problems regarding this automatic email." + "\n\n";    
    
    var subject = "A new GGGSC " + values[4] + " Equipment Reservation has been made" + " by " + values[10] + ".";
    
    MailApp.sendEmail(emailAddress, subject, message); //!!!Comment or uncomment this statement to disable mail being sent!!!\\
  
    Logger.log('!!!!Sent Reservation Confirmation Email!!!!!')
  
}


function SendReservationConflictEmail(namedValues, values, calURL, startDate, endDate) {
    
    var emailGGGSC = "pbrown@usgs.gov,blburton@usgs.gov"; //,mhpowers@usgs.gov,blburton@usgs.gov"; //add multiple people seperated by a comma, no space, within the quotes 
    var emailOriginator = values[1];
    Logger.log('emailOriginator: ' + emailOriginator);   
    var emailAddress = emailGGGSC + "," + emailOriginator;
    
    var message = values [0]+ "\n" + "A new GGGSC Equipment Reservation CAN NOT BE MADE for the " + values [4] + "." + "\n\n"
     message += "The reservation dates you selected are from " + values[2] + " to " + values[3] + "." + "\n\n";
     message += "These dates conflict with a previous reservation made from " + startDate + " to " + endDate + "." + "\n\n"; 
     message += "\n\n" + "To view the current reservations for the " + values[4] + ", visit: " + "\n"  + calURL + "\n\n";     
     message += "To reserve this equipment, please submit a new Equipment Reservation Form that does not conflict with a current reservation, https://docs.google.com/forms/d/e/1FAIpQLScN0jmFhWl_tEzlC7ytedRR619-qYgujcC-FezJfv0XHczb7Q/viewform?usp=sf_link \n\n"; 
     message +=  "Contact Beth Burton (blburton@usgs.gov) if further assistance is required.";
        
    
    var subject = "A new GGGSC Equipment Reservation for the "  + values [4] + " CAN NOT BE MADE because it conflicts with an existing reservation.";
    
    MailApp.sendEmail(emailAddress, subject, message); //!!!Comment or uncomment this statement to disable mail being sent!!!\\
  
  Logger.log('!!!!Sent Reservation Rejection Email!!!!!')

}

function SendResponseEditEmail (emailOriginator, editURL, namedValues, values, resItem, resStart, resEnd, resOriginator) {
  var emailAddress = "pbrown@usgs.gov,blburton@usgs.gov," + emailOriginator;// add additional emails here seperated by a comma
  var subject = resOriginator + "'s equipment reservation for the " +  resItem + " has been edited.";
  var message = resOriginator + "'s equipment reservation for the " +  resItem + " from " + resStart + " to " + resEnd + " has been edited and the equipment stewards have been notified." + "\n";
  message += "The email contact for the editor is: " + emailOriginator +"\n\n";
  message += "The edited values are listed below.  Blank listings indicate values that have not been changed. \n\n";
  for(var field in namedValues) {
           message += '    ' + field + ' :: '
             + namedValues[field].toString() + "\n";
         }
  
  message += "\n\n To edit this reservation again visit: \n " + editURL + "\n\n";
  
  MailApp.sendEmail(emailAddress, subject, message); //!!!Comment or uncomment this statement to disable mail being sent!!!\\  

}
