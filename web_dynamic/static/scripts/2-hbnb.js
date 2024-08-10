$(function () {
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    type: 'GET',
    success: (data) => {
      if (data.status == 'OK') {
        $('DIV#api_status').addClass("available");
      }
      else {
        $('DIV#api_status').removeClass("available");
      }
    }
  });
});

function display_amenities (amenities_dict) {
  const amenities = Object.values(amenities_dict).join(', ');
  if (amenities) { // check if text is empty or not
    $('.amenities h4').text(amenities);
  } else {
    $('.amenities h4').html('&nbsp;');
  }
}

$(function () {
  const amenities_dict = {};
  $('.amenities .popover input').on('click', function () {
    const isChecked = $(this).is(':checked');
    const amenity_name = $(this).attr('data-name');
    const amenity_id = $(this).attr('data-id');

    if (isChecked) {
      amenities_dict[amenity_id] = amenity_name;
    } else {
      delete amenities_dict[amenity_id];
    }
    display_amenities(amenities_dict);
  });
});
