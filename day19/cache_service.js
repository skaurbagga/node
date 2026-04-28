/*const redis = require('redis');

// Create client ONCE
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

// ---------------- CONNECT ON START ---------------- 
(async () => {
    await client.connect();
    console.log('Redis Connected');
})();

// ---------------- CACHE FUNCTION ---------------- 
async function getActivities() {
    const cacheKey = 'popular_activities';

    // 1. Try Redis (Cache HIT)
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
        console.log('Cache HIT → Returning from Redis');
        return JSON.parse(cachedData);
    }

    // 2. Cache MISS → Simulate DB
    console.log('Cache MISS → Fetching from Database...');

    await new Promise(r => setTimeout(r, 200)); // simulate DB delay

    const dbData = [
        { id: 1, name: 'Mountain Hiking' },
        { id: 2, name: 'Tech Networking' }
    ];

    // 3. Save to Redis (TTL = 60 sec)
    await client.setEx(cacheKey, 60, JSON.stringify(dbData));

    return dbData;
}

// ---------------- TEST RUN ---------------- 
(async () => {
    const data = await getActivities();
    console.log(data);
})();*/


const redis = require('redis');

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

/* ---------------- CONNECT ON START ---------------- */
(async () => {
    await client.connect();
    console.log('Redis Connected');
})();

/* ---------------- FAKE DATABASE ---------------- */
let fakeDB = [
    { id: 1, name: 'Mountain Hiking' },
    { id: 2, name: 'Tech Networking' }
];

/* ---------------- GET WITH CACHE ---------------- */
async function getActivities() {
    const cacheKey = 'popular_activities';

    const cachedData = await client.get(cacheKey);

    if (cachedData) {
        console.log('Cache HIT');
        return JSON.parse(cachedData);
    }

    console.log('Cache MISS → Fetching from DB...');

    await new Promise(r => setTimeout(r, 200)); // simulate delay

    await client.setEx(cacheKey, 60, JSON.stringify(fakeDB));

    return fakeDB;
}

/* ---------------- UPDATE + INVALIDATE CACHE ---------------- */
async function updateActivity(id, newName) {
    // 1. Update DB
    fakeDB = fakeDB.map(activity =>
        activity.id === id ? { ...activity, name: newName } : activity
    );

    console.log(`Updated activity ${id} to ${newName}`);

    // 2. Invalidate Cache
    await client.del('popular_activities');

    console.log('Cache INVALIDATED');
}

/* ---------------- TEST FLOW ---------------- */
(async () => {

    console.log('\n--- First Fetch ---');
    console.log(await getActivities()); // MISS

    console.log('\n--- Second Fetch ---');
    console.log(await getActivities()); // HIT

    console.log('\n--- Updating Data ---');
    await updateActivity(1, 'AI Hackathon');

    console.log('\n--- After Update Fetch ---');
    console.log(await getActivities()); // MISS again (fresh data)

})();