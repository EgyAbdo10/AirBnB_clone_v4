$(function () {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({
    }),
    // headers: {
    //   "Content-Type": "application/json"
    // },
    contentType: 'application/json',
    success: (places) => {
      $.each(places, (idx, place) => {
      // {% if place.max_guest != 1 %}s{% endif %}
      // guset and guests
      // {% if place.number_rooms != 1 %}s{% endif %}
      // bathroom and bedrooms
      // {% if place.number_bathrooms != 1 %}s{% endif %}
      // bedroom and bedrooms
        $.ajax({
          url: `http://localhost:5001/api/v1/users/${place.user_id}`,
          type: 'GET',
          success: (user) =>

            $('section.places').append(
        `<article>
      <div class="title_box">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">${place.price_by_night}</div>
	  </div>
      <div class="information">
	    <div class="max_guest">${place.max_guest} Guests</div> 
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
	  </div>
    <div class="user">
            <b>Owner:</b> ${user.first_name} ${user.last_name}
          </div>
          <div class="description">
	    ${place.description}
          </div>
    </article>`
            )
        });
      });
    }
  });
});

$(function () {
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    type: 'GET',
    success: (data) => {
      if (data.status == 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
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
