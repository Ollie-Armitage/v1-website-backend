module.exports = {
    dblink: "mongodb+srv://ollie-0:"
    + process.env.dbpassword
    + "@website-cluster-0.5nllz.azure.mongodb.net/"
    + process.env.dbname
    + "?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET,
    adminPassword: process.env.adminpass

}
// Need to enter password and dbname into node args.
