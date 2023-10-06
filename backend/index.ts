import express from "express";
import cors from "cors";
import userRoutes from "./admin/routes/userRoutes";
import adminRoutes from "./admin/routes/adminRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin/user", userRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
