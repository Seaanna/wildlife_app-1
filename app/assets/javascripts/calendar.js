$(document).ready(function() {
   $("#calendar").fullCalendar({
     header: {
       left: "prev,next today",
       center: "title",
       right: "month,agendaWeek,agendaDay"
     },
     defaultView: "month",
     height: 500,
     slotMinutes: 15,
     events: "/sightings/get_sightings",
     timeFormat: "LT",
     dragOpacity: "0.5",
    //  if the sighting has a url then it will open in a new window
     eventClick: function(sighting) {
       if (sighting.url) {
         window.open(sighting.url);
         return false;
       }
     }
  });
});
