const express = require("express");
const cors = require("cors");

const app = express();

console.log(process.argv)

// Middle Ware

app.use(express.json());
app.use(cors());

const submits = require('./routes/api/submits');
const blogs = require('./routes/api/blog');
const token = require('./routes/api/token');


app.use('/submits', submits);
app.use('/blog', blogs);
app.use('/token', token)

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
