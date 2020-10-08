exports.dblink = "mongodb+srv://ollie-0:"
        + process.env.dbpassword
        + "@website-cluster-0.5nllz.azure.mongodb.net/"
        + process.env.dbname
        + "?retryWrites=true&w=majority"

// Need to enter password and dbname into node args.