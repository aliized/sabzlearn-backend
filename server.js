const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = require("./app");
const { resetCollections } = require("./util/resetAll");
const cron = require("node-cron");

//* Load env
dotenv.config();

//* Database connection
(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    //?error catch
    console.log(err);
    process.exit(1);
  }
})();

const port = +process.env.PORT || 3000;

const productionMode = process.env.NODE_ENV === "production";
app.listen(port, () => {
  console.log(
    `Server running in ${
      productionMode ? "production" : "development"
    } mode on port ${port}`
  );
});

// Schedule resetCollections at 0 and 30 mins of every hour
cron.schedule("0,30 * * * *", () => {
  resetCollections();
});
