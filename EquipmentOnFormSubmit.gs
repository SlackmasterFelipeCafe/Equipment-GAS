function RunOnFormSubmit(e) {
  var namedValues = e.namedValues; //define form event object namedValues
  var values = e.values;
  
  var item = values[4];
  var resStartTime = values[2];
  var resEndTime = values[3];
  //Logger.log('Form submit item: ' + item);
  //Logger.log('Form submit resStartTime: ' + resStartTime);
  //Logger.log('Form submit resEndTime: ' + resEndTime);  
  CheckIfResponseIdExists(item, resStartTime, resEndTime, namedValues, values);
}
