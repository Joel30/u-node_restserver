const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //conexión a mongo
    await mongoose.connect(process.env.MONGODB_CNN/*, {
      // No More Deprecation Warning Options:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }*/);

    console.log("base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = { dbConnection };
