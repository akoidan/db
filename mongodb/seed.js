import { MongoClient } from 'mongodb';

async function main() {
  const uri = 'mongodb://localhost:27040/messaging-app';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('messaging-app');
    const users = db.collection('users');

    const bulkSize = 10000; // number of docs per batch
    const docSize = 10240; // ~1KB per doc
    const totalDocs = 900_000; // roughly 70MB of data

    console.log('Inserting users...');

    for (let i = 0; i < totalDocs; i += bulkSize) {
      const batch = [];
      for (let j = 0; j < bulkSize; j++) {
        const id = i + j;
        batch.push({
          username: `user3_${id}`,
          email: `user3_${id}@example.com`,
          bio: 'y'.repeat(docSize), // filler to increase size
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