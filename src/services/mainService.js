import PocketBase from 'pocketbase';
import { loadEnvFile } from 'node:process';
loadEnvFile('./src/.env')
const DRONE_ID = process.env.DRONE_ID;
const API_TOKEN = process.env.API_TOKEN;
const URL_SERVER1 = process.env.URL_SERVER1;
const URL_SERVER2 = process.env.URL_SERVER2;

const pb = new PocketBase(URL_SERVER2);
// pb.authStore.save(API_TOKEN, null);
pb.authStore.save(`Bearer ${API_TOKEN}`, null); // This sends Authorization: Bearer 20250901efx

const getDroneConfigs = async ()=>{
  try {
    const response = await fetch(URL_SERVER1);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("drone config sample:");
    console.log(result.data[0]);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};

const getDroneLogsById = async (droneId=3001)=>{
    try {
        const resultList = await pb.collection('drone_logs').getList(1, 12, {
            filter: `drone_id=${droneId}`,
            sort: '-created',
        });

        console.log('--- PocketBase Records List ---');
        console.log(`Token used: ${API_TOKEN}`);
        // console.log(`Total items found: ${resultList.totalItems}`);
        console.log('First record:');
        console.log(resultList.items[0]);

        return resultList;

    } catch (error) {
        console.error('An error occurred during PocketBase fetch:', error);
    }
};

const createRecord = async (message) => {
    try{
        const record = await pb.collection('drone_logs').create({
            drone_id:message.drone_id,
            drone_name:message.drone_name,
            country:message.country,
            celsius:message.celsius,
        });

        return "OK";
    }catch(e){
        console.error(e); 
        return "error";
    }
};

// const logs = await getDroneLogsById(65011104);
// console.log(logs);

export default {
    getDroneConfigs,
    getDroneLogsById,
    createRecord,
}

// const droneConfigs = await getDroneConfigs();
// const droneConfig = droneConfigs.data.find( drone => drone.drone_id == DRONE_ID);

// console.log(droneConfig);

