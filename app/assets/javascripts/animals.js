

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

      $.ajax({
        dataType: 'json',
        url: '/animals',
        method: 'POST',
        data: new_animal,
        success: function(data) {
          $("#animal_list").append(
            "<tr class='text-center'>" +
              "<td class='text-center vertical_center small cav'>" + data.common_name + "</td>" +
              "<td class='text-center vertical_center small cav'>" + data.latin_name + "</td>" +
              "<td class='text-center vertical_center small cav'>" + data.kingdom + "</td>" +
              "<td class='text-center vertical_center cav'>" + '<a href="/animals/' + data.id + '" class="btn btn-primary">Show</a>' + "</td>" +
              "<td class='text-center vertical_center cav'>" + '<a href="/animals/' + data.id + '/edit" class="btn btn-success">Edit</a>' + "</td>" +
              "<td class='text-center vertical_center cav'>" + '<a data-method="delete" data-confirm="Are you sure?" href="/animals/' + data.id + '" class="btn btn-danger">Destroy</a>' + "</td>" +
              // notice the 'data-method="delete" data-confirm="Are you sure?"' is necessary to delete and confirm deletion!
            "</tr>"
          );
          // Clear out values in inputs if the animal is saved
          $("#animal_common_name").val('');
          $("#animal_latin_name").val('');
          $("#animal_kingdom").val('')
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Add new animal failed: " + errorThrown);
        }
      });// ajax
    });// on click
});
