const creepFunctions = require('creepFunctions');
const roleUpgrader = require('role.upgrader');

var roleHarvester = {

    roleName: "Harvester",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    transferEnergy: function(creep) {
        var structures = creep.room.find(FIND_MY_STRUCTURES).filter(structure => {
            if(structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER &&
            structure.store.getFreeCapacity() > 0) {
                return structure;
            }
        });
        if(creep.transfer(structures[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structures[0], {visualizePathStyle: creepFunctions.pathStyle});
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        creepFunctions.workerStateCheck(creep);

        if (!creep.memory.working) {
            creepFunctions.harvest(creep);
        }
        else if (creep.memory.working) {
            if (Game.spawns[creep.memory.spawn].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                roleUpgrader.run(creep);
            }
            else {
                roleHarvester.transferEnergy(creep);
            }
        }
    }
};

module.exports = roleHarvester;
