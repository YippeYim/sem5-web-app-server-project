import services from '../services/mainService.js';
const droneConfigs = await services.getDroneConfigs();
// console.log(droneConfigs);

const getHome = (req, res) => {
    console.log('someone GET Hello');
    res.send({"message":"hello"});
};

const getDroneConfig = (req,res) =>{
    console.log('someone GET drone ID');
    const idToFind = req.params.droneId;
    console.log(`finding drone id = ${idToFind}`);
    const message = droneConfigs.find(drone => drone.drone_id == idToFind);
    
    const { condition, population, ...newObject } = message;
    
    res.send(newObject);
};

const getDroneStatus = (req, res) =>{
    console.log('someone GET drone ID');
    const idToFind = req.params.droneId;
    console.log(`finding drone id = ${idToFind}`);
    const message = droneConfigs.find(drone => drone.drone_id == idToFind);
    
    const { condition } = message;
    
    res.send(condition);
};


export default {
    getHome,
    getDroneConfig,
    getDroneStatus,
}