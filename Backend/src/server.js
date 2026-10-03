const app = require('./app');
const env = require('./config/env');

app.listen(env.PORT, () => {
  console.log(`The Real Sam University API running on port ${env.PORT}`);
});
