var { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
var bcrypt = require("bcrypt");
const jose = require("jose");
var { verifyToken } = require("../functions/token");

class DB {
  constructor() {}

  static async connect() {
    const uri = `mongodb+srv://HaastDev:${process.env.PM}@c0.6az8i.mongodb.net/?retryWrites=true&w=majority&appName=c0`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    return client;
  }

  static async close(client) {
    await client.close();
  }

  static async logIn(username, pass) {
    try {
      const client = await this.connect();
      try {
        const db = client.db("todoDB");
        const collection = db.collection("user");
        const result = await collection.findOne({
          username: username,
        });
        if (result._id) {
          if (bcrypt.compareSync(pass, result.pass)) {
            await this.close(client);
            return result;
          } else {
            await this.close(client);
            throw {
              error: "Wrong password",
            };
          }
        } else {
          await this.close(client);
          throw {
            error: "No user",
          };
        }
      } catch (error) {
        await this.close(client);
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getTasks(token) {
    try {
      const user = await verifyToken(token);
      const userId = user.user.toString();
      try {
        const client = await this.connect();
        try {
          const db = client.db("todoDB");
          const collection = db.collection("task");
          const result = await collection
            .find(
              {
                user: new ObjectId(userId),
              },
              { projection: { user: 0 } }
            )
            .toArray();
          await this.close(client);
          console.log(result);
          return result;
        } catch (error) {
          console.log(error);
          await this.close(client);
          throw error;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateTask(token, idTask, state) {
    try {
      const user = await verifyToken(token);
      const userId = user.user.toString();
      try {
        const client = await this.connect();
        try {
          const db = client.db("todoDB");
          const collection = db.collection("task");
          const result = await collection.updateOne(
            {
              _id: new ObjectId(idTask),
              user: new ObjectId(userId),
            },
            {
              $set: {
                state: state,
              },
            }
          );
          await this.close(client);
          return result.modifiedCount;
        } catch (error) {
          await this.close(client);
          throw error;
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(token, idTask) {
    try {
      const user = await verifyToken(token);
      const userId = user.user.toString();
      try {
        const client = await this.connect();
        try {
          const db = client.db("todoDB");
          const collection = db.collection("task");
          const result = await collection.deleteOne({
            _id: new ObjectId(idTask),
            user: new ObjectId(userId),
          });
          await this.close(client);
          return result.deletedCount;
        } catch (error) {
          await this.close(client);
          throw error;
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async addTask(token, task) {
    try {
      const user = await verifyToken(token);
      const userId = user.user.toString();
      try {
        const client = await this.connect();
        try {
          const db = client.db("todoDB");
          const collection = db.collection("task");
          const result = await collection.insertOne({
            user: new ObjectId(userId),
            state: task.state,
            title: task.title,
          });
          await this.close(client);
          return result.insertedId;
        } catch (error) {
          await this.close(client);
          throw error;
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async register(username, pass) {
    try {
      const client = await this.connect();
      try {
        const db = client.db("todoDB");
        const collection = db.collection("user");
        const result = await collection.insertOne({
          username: username,
          pass: bcrypt.hashSync(
            pass,
            parseInt(new TextEncoder().encode(process.env.SP))
          ),
        });
        await this.close(client);
        return result;
      } catch (error) {
        await this.close(client);
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DB;
