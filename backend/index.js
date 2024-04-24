const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios module

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "81e8cab7-9cc0-490e-847e-31b50882530b" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // Check if e.response exists before accessing its properties
      return res.status(e.response.status).json(e.response.data);
    } else {
      // If e.response doesn't exist, handle the error accordingly
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(3001);
