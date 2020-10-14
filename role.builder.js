const roleHarvester = require('role.harvester');
const creepFunctions = require('creepFunctions');

var roleBuilder = {

    roleName: "Builder",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        creepFunctions.workerStateCheck(creep);

        if (!creep.memory.working) {
            creepFunctions.harvest(creep);
        }
        else {
            var sites = creepFunctions.getConstructionSites(creep);
            if(sites.length == 0) {
                roleHarvester.run(creep);
            }
            else {
                creepFunctions.build(creep, sites);
            }
        }
    }
};

module.exports = roleBuilder;
