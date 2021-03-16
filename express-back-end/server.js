const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const lebron_shots = require('./data/lebron_shots.json')
const curry_shots = require('./data/curry_shots.json')
const lebron_videos = require('./data/lebron_videos.json')
const curry_videos = require('./data/curry_videos.json')
const league_leaders = require('./data/league_leaders.json')
const dummy_shots = require('./data/dummy_shots.json')

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/shots', (req, res) => 
  {if (req.query.name === "lebron") {
    res.json(lebron_shots)
  } else if (req.query.name === "curry") {
    res.json(curry_shots)
  }}
)
App.get('/api/videos', (req, res) =>
  {if (req.query.name === "lebron") {
    res.json(lebron_videos)
  } else if (req.query.name === "curry") {
    res.json(curry_videos)
  }}
)
App.get('/api/leaders', (req, res) =>
  res.json(league_leaders)
)
App.get('/api/dummy', (req, res) =>
  res.json(dummy_shots)
)
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
