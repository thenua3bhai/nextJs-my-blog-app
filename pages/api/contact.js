const { MongoClient, ServerApiVersion } = require("mongodb");

//in this api folder the code only executes on server side it never executes on any client side , it get the req. talk to db and send response to frontend browser code.
async function handler(req, res) {
  //any other req . other than post will be ignored and won't do any thing
  if (req.method === "POST") {
    const { email, name, message } = req.body; // nextjs parse this req. for us so we have clear object in req.body js object not json type

    //validating that proper input is there because front end validation can be tricked how ?
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." }); //return error response convert into json for not proper input
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);

    let client;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://adist:${process.env.MONGO_KEY}@blogcluster3.ybfrssg.mongodb.net/?retryWrites=true&w=majority`
      );
      console.log("Yes Connected");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not connect to database." });
      return; //terminate the function here
    }

    const db = client.db("fdb");

    //Mongo atlas hierarchy father to children
    //Org. name -> Proejctname -> clustername -> database name -> collection name ->actual data

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId; //Auto generated id in mongodb
    } catch (error) {
      client.close(); //close the connection with mongo
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
    //sending response with status code
  }
}

export default handler;
