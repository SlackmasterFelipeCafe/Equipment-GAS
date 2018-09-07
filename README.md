# GGGSC GAS - Google Application Scripts being used by the GGGSC 
US Geological Survey (USGS)

Geology, Geophysics, and Geochemistry Science Center (GGGSC)

Google Application Scripts (GAS)

Contact Phil Brown (pbrown@usgs.gov)

USGS Profile: https://www.usgs.gov/staff-profiles/philip-j-brown

ORCID: https://orcid.org/0000-0002-2415-7462


## GsheetCol2Gdoc:

Google sheet script that posts a column of data from an active Google-Sheet to an existing Google-Doc with a custom title heading.

## EquipmentEmailFunctions:

Google sheet functions that send emails releated to the equipment reservation system.  These include:

- **SendReservationConfirmationEmail**, function that sends a reservation confirmation email

- **SendReservationConflictEmail**, function that sends conflict email if there is a conflicting reservations being made for the same equipment.  Email lists the conflicting dates and for what project

- **SendResponseEditEmail**, function that sends an email if a reservation is edited.  Email sends listing of current reservation values

## EquipmentCalendarFunctions:

Functions used to check and update GGGSC Equipment Calendars
- **runCalendarCheck**
- **returnCalendarID**
- **returnCalendarURL**
- **CheckCalendarEvents**
- **deleteBogusRecord**
- **deleteRow**
- **EditCalendarEvent**
- **ManuallyEditCalendarEvent**
- **manuallyAddEventAddedToSpreadSheet**
