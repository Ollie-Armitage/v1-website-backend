exports.dblink = "mongodb+srv://ollie-0:"
        + process.argv[2]
        + "@website-cluster-0.5nllz.azure.mongodb.net/"
        + process.argv[3]
        + "?retryWrites=true&w=majority"

// Need to enter password and dbname into node args.