import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {
  const connection = await connectToDatabase();
  if (connection) {
    const { database } = connection;
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const results = await collection.find({}).limit(10).toArray();

    console.log({ results });

    response.status(200).json(results);
  } else {
    response.status(500).json("error");
  }
}
