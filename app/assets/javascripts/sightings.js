$("document").ready(function() {

  $("#add_new_sighting_button").on("click", function() {
      // Data to be submitted
      new_sighting = {
        "sighting": {
          "animal_id": $("#animal_id").val(),
          "date": $("#sighting_date_1i").val() + "-" + $("#sighting_date_2i").val() + "-" + $("#sighting_date_3i").val() + "T" + $("#sighting_date_4i").val() + ":" + $("#sighting_date_5i").val(),
          "longitude": $("#sighting_longitude").val(),
          "latitude": $("#sighting_latitude").val(),
          "region": $("#sighting_region").val()
        }//"sighting"
      } //new sighting

      alert("Sending message: " + JSON.stringify(new_sighting));

      $.ajax({
        dataType: 'json',
        url: '/sightings',
        method: 'POST',
        data: new_sighting,
        success: function(data) {
          alert("Received message: " + JSON.stringify(data));
          $("#sighting_list").append(
            "<tr>" + "<td>" + data.date + "</td>" + "<td>" + data.latitude + "</td>" + "<td>" +  data.longitude + "</td>" + "<td>" +  data.region + "</td>" + "<td>" + '<a href="/sighting/' + data.id + '/edit" class="btn btn-success">Edit</a>' + "</td>" + "</tr>"
          )
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Add new sighting failed: " + errorThrown);
        }
      });// ajax
    });// on click
  }); // doc ready
