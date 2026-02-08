import { MongoClient } from 'mongodb';
import {config} from 'dotenv';


async function main() {

  config();

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('messaging-app');



    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      await db.admin().command({
        shardCollection: 'messaging-app.users', // full namespace
        key: { _id: 1 }                        // shard key
      });
      console.log('Created users collection');
    }

    if (!collectionNames.includes('messages')) {
      const messages = await db.createCollection('messages');
      console.log('Created messages collection');
      await db.admin().command({
        shardCollection: 'messaging-app.messages', // full namespace
        key: { userId: 1 }                        // shard key
      });
      await messages.createIndex('userId');
    }


    const users = db.collection('users');

    const bulkSize = 1_000;
    const docSize = 10240;
    const totalDocs = 90_000_00;

    console.log('Inserting users...');

    for (let i = 0; i < totalDocs; i += bulkSize) {
      const batch = [];
      for (let j = 0; j < bulkSize; j++) {
        const id = i + j;
        batch.push({
          username: `user1_${id}`,
          email: `user1_${id}@example.com`,
          bio: 'x'.repeat(docSize), // filler to increase size
          createdAt: new Date(),
        });
      }
      await users.insertMany(batch);
      console.log(`Inserted ${i + bulkSize} users`);
    }

    console.log('Done inserting large amount of users.');
  } finally {
    await client.close();
  }
}

main().catch(console.error);