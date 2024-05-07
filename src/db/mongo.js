import { MongoClient } from 'mongodb';
import { MONGO_DB } from '$env/static/private'; 

const client = new MongoClient(MONGO_DB)

export function start_mongo() {
    console.log('Starting mongo...')
    return client.connect()
}

export default client.db()