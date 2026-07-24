const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Nexus API is running on port ${PORT}`);
});
