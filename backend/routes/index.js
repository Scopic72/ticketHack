var express = require('express');
var router = express.Router();


const { Client } = require('pg');
const connectionString = 'postgres://urpqmbuu:HxzArpvdhosL3yUqKckK-a4rdl7yf96p@horton.db.elephantsql.com/urpqmbuu';

const client = new Client({ connectionString });
client.connect();




router.get("/tickets/:city_departure/:city_arrival/:travel_date", (req, res) => {
  const cityDeparture = req.params.city_departure.toLowerCase();
  const cityArrival = req.params.city_arrival.toLowerCase();
  const travelDate = req.params.travel_date;

  client.query('SELECT * FROM tickets WHERE LOWER(departure) = $1 AND LOWER(arrival) = $2 AND DATE(date) = $3', [cityDeparture, cityArrival, travelDate], (err, result) => {
    if (err) {
      console.error(err);
      res.json({ result: false, error: "Une erreur est survenue" });
      return;
    }

    if (result.rows.length > 0) {
      res.json({ result: true, Trips: result.rows });
    } else {
      res.json({ result: false, error: "Trips not found" });
    }
  });
});





module.exports = router;
