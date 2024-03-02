require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRouter.js");
const getApiData = require("./routers/dataRouter.js");
const adminRouter = require("./routers/adminRouter.js");
const connectDB = require("./utils/config.js");
const errorMiddelware = require("./middlewares/errorMiddelware.js");
const contactRouter = require("./routers/contactRouter.js");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", userRouter);
app.use("/api/data", getApiData);
app.use("/api/contact", contactRouter);
app.use("/api/admin/auth", adminRouter);

app.use(errorMiddelware);
connectDB(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    console.log(`Database is connected`);
  })
  .catch((e) => console.log(`Database connection error ${e}`));
