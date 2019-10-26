require('dotenv').config();
require('express-group-routes');
const expreses = require('express');
const app = expreses();
const port = process.env.PORT || 3000;

// routes
const indexRoutes = require('./routes/index');

app.use(expreses.json());
app.use(expreses.urlencoded({ extended: false }));

app.group('/api/v2', routes => {
  routes.use('/', indexRoutes);
});

app.listen(port, () => console.log('App listening on port', port));
