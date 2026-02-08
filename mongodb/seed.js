import { MongoClient } from 'mongodb';

async function main() {
  const uri = 'mongodb://admin:password@localhost:27040/messaging-app?authSource=admin';

  const client = new MongoClient(uri);

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

    const bulkSize = 1_000; // number of docs per batch
    const docSize = 10240; // ~1KB per doc
    const totalDocs = 90_000_000; // roughly 70MB of data

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