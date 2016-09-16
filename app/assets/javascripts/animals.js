

$("document").ready(function() {

  $("#add_new_animal_button").on(
    "click",
    function() {
      // Data to be submitted
      new_animal = {
        "animal": {
          "common_name": $("#animal_common_name").val(),
          "latin_name": $("#animal_latin_name").val(),
          "kingdom": $("#animal_kingdom").val()
        }
      };
      alert("Sending message: " + JSON.stringify(new_animal));

      $.ajax({
        dataType: 'json',
        url: '/animals',
        method: 'POST',
        data: new_animal,
        success: function(data) {
          alert("Received message: " + JSON.stringify(data));
          $("#animal_list").append(
            "<tr>" +
              "<td>" + data.common_name + "</td>" +
              "<td>" + data.latin_name + "</td>" +
              "<td>" + data.kingdom + "</td>" +
              "<td>" + '<a href="/animals/' + data.id + '">Show</a>' + "</td>" +
              "<td>" + '<a href="/animals/' + data.id + '">Edit</a>' + "</td>" +
              "<td>" + '<a href="/animals/' + data.id + '">Destroy</a>' + "</td>" +
            "</tr>"
          );
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Add new animal failed: " + errorThrown);
        }
      });// ajax
    });// on click
});
