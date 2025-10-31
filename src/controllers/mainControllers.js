import services from '../services/mainService.js';
const droneConfigs = await services.getDroneConfigs();
// console.log(droneConfigs);

const getHome = (req, res) => {
    console.log('someone access');
    res.send({"message":"hello"});
};


export default {
    getHome
}