const express = require("express");
const app = express();
const cors = require("cors");

console.log(process.argv)

// Middle Ware

app.use(express.json());
app.use(cors());

const submits = require('./routes/api/submits');
const blogs = require('./routes/api/blog');
const token = require('./routes/api/token');
const projects = require('./routes/api/projects');


app.use('/submits', submits);
app.use('/blog', blogs);
app.use('/token', token)
app.use('/projects', projects)

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
