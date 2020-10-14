const creepFunctions = require('creepFunctions');
const roleUpgrader = require('role.upgrader');

var roleHarvester = {

    roleName: "Harvester",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    transferEnergy: function(creep) {
        // Find all owned spawns, extensions, and towers in the room
        var structures = creep.room.find(FIND_MY_STRUCTURES).filter(structure => {
            if((structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                return structure;
            }
        });
        // Sorts strucures by amount of energy in descending order
        structures.sort((a, b) => {
            return (a.store.getUsedCapacity(RESOURCE_ENERGY) -
                    b.store.getUsedCapacity(RESOURCE_ENERGY));
        });
        // If there are no strucutres that need energy, upgrade. Otherwise transfer
        if(structures.length == 0) {
            roleUpgrader.run();
        }
        else if(creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
            roleHarvester.transferEnergy(creep);
        }
    }
};

module.exports = roleHarvester;
