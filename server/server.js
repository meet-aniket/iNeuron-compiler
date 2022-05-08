require("dotenv").config();

const app = require("express")();
const bodyParser = require("body-parser");
const createError = require("http-errors");

const cors = require("cors");

// DB Configuration
const { mongoConfig } = require("./configs/mongo");
mongoConfig();

// Routes
// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
const compilerRoutes = require("./routes/compiler");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Definition
// app.use("/api", authRoutes);
// app.use("/api", userRoutes);
app.use("/api", compilerRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
})

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

// PORT Definition
const PORT = process.env.PORT || 8000;

// SERVER Configuration
app.listen(PORT, () => {
  console.info(`app is running at ${PORT}`);
})