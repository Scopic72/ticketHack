document.querySelector('#search-button').addEventListener('click', function () {
  const city_departure = document.querySelector('#city_departure').value;
  const city_arrival = document.querySelector('#city_arrival').value;
  const travel_date = document.querySelector('#travel_date').value;

  fetch(`http://localhost:3000/tickets/${city_departure}/${city_arrival}/${travel_date}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const yourTripContainer = document.querySelector('#your-trip');
      yourTripContainer.innerHTML = ''; // Réinitialiser le contenu avant d'ajouter les nouveaux trajets

      if (data.result === true) {
        for (let i = 0; i < data.Trips.length; i++) {
          let departure = data.Trips[i].departure;
          let arrival = data.Trips[i].arrival;
          let date = new Date(data.Trips[i].date);
          let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          let price = data.Trips[i].price;

          const city_trip = `
            <div class="trajets">
              <p>${departure} > ${arrival}</p>
              <p>${formattedDate}</p>
              <p>${price} €</p>
            </div>`;

          yourTripContainer.innerHTML += city_trip;
        }

        // cacher la div de base proposant de rechercher son trip
        const findYourTrip = document.querySelector("#find-your-trip");
        findYourTrip.classList.remove("active");
        findYourTrip.classList.add("none");

        //cacher au cas ou la div aucun trip trouvé
        const noTouyTripFound = document.querySelector("#no-your-trip-found");
        noTouyTripFound.classList.remove("active");
        noTouyTripFound.classList.add("none");

        // afficher la div avec les résultats
        const yourTrip = document.querySelector("#your-trip");
        yourTrip.classList.remove("none");
        yourTrip.classList.add("active");


      } else {
        // afficher la div aucun trip trouvé
        const noTouyTripFound = document.querySelector("#no-your-trip-found");
        noTouyTripFound.classList.remove("none");
        noTouyTripFound.classList.add("active");

        // cacher la div avec les résultats
        const yourTrip = document.querySelector("#your-trip");
        yourTrip.classList.remove("active");
        yourTrip.classList.add("none");

        // cacher la div de base proposant de rechercher son trip
        const findYourTrip = document.querySelector("#find-your-trip");
        findYourTrip.classList.remove("active");
        findYourTrip.classList.add("none");


      }
    })
    .catch(error => {
      console.error(error);
    });
});
