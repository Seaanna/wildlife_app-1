$("document").ready(function() {

  $("#add_new_sighting_button").on(
    "click",
    function() {
      // Data to be submitted
      new_sighting = {
        "sighting": {
          "animal_id": $("#animal_id").val(),
          "date": $("#sighting_date").val(),
          "longitude": $("#sighting_longitude").val(),
          "latitude": $("#sighting_latitude").val(),
          "region": $("#sighting_region").val()
        }
      };
      alert("Sending message: " + JSON.stringify(new_sighting));

      $.ajax({
        dataType: 'json',
        url: '/sightings',
        method: 'POST',
        data: new_sighting,
        success: function(data) {
          alert("Received message: " + JSON.stringify(data));
          $("#sighting_list").append(
              "<li>" + data.date + " " + data.latitude + " " + data.longitude + " " + data.region  + "</li>"
          );
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Add new sighting failed: " + errorThrown);
        }
      });// ajax
    });// on click
  }); // doc ready
