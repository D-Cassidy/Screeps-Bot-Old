const creepFunctions = require('creepFunctions');
const roleUpgrader = require('role.upgrader');

var roleHarvester = {

    roleName: "Harvester",

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
            var structures = creepFunctions.getTransferrableStructures(creep);
            if(structures.length == 0) {
                roleUpgrader.run(creep);
            }
            else {
                creepFunctions.transferEnergy(creep, structures);
            }
        }
    }
};

module.exports = roleHarvester;
