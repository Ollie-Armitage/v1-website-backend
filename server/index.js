const express = require("express");
const cors = require("cors");

const app = express();

// Middle Ware

app.use(express.json());
app.use(cors());

const submits = require('./routes/api/submits');
const blogs = require('./routes/api/blog');

app.use('/api/submits', submits);
app.use('/api/blog', blogs);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
