import services from '../services/mainService.js';
// const droneConfigs = await services.getDroneConfigs();
// console.log(droneConfigs);

const getHome = (req, res) => {
    console.log('someone GET Hello');
    res.send({"message":"hello"});
};

const getDroneConfig = (req,res) =>{
    console.log('someone GET drone ID');
    const idToFind = req.params.droneId;
    console.log(`--finding drone id = ${idToFind}`);
    const message = droneConfigs.find(drone => drone.drone_id == idToFind);
    
    const { condition, population, ...newObject } = message;
    
    res.send(newObject);
};

const getDroneStatus = (req, res) =>{
    console.log('someone GET drone ID condition');
    const idToFind = req.params.droneId;
    console.log(`--finding drone id = ${idToFind}`);
    const message = droneConfigs.find(drone => drone.drone_id == idToFind);
    
    const { condition } = message;
    
    res.send(condition);
};

const getDroneLogs = async (req, res) =>{
    console.log('someone GET drone log');
    const idToFind = req.params.droneId;
    console.log(`--finding drone id = ${idToFind}`);
    const message = await services.getDroneLogsById(idToFind);

    const cleanedArray = message.items.map(obj => {
    // ดึง 'celsius' ออกไป (ซึ่งจะถูกละทิ้ง)
      // และเก็บส่วนที่เหลือทั้งหมดไว้ในตัวแปร 'restOfObject'
      const { collectionId, collectionName, id, updated, ...restOfObject } = obj; 
  
      return restOfObject;
    });

    res.send(cleanedArray);
};

const postLogs = (req, res)=>{
    // console.log(req.query);
    const query = req.query;
    query.celsius = parseInt(query.celsius,10);

    const result = services.createRecord(query);
    res.send(result);
};


export default {
    getHome,
    getDroneConfig,
    getDroneStatus,
    getDroneLogs,
    postLogs,
}