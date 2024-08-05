const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const { apiCall, parseHtml } = require("./helper");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://another-example.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  console.log(apiCall);
  const result = await apiCall(req.body.url).then((response) =>
    parseHtml(response)
  );
  console.log(result);
  res.send({ result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
