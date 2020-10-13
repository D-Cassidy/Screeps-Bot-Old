const creepFunctions = require('creepFunctions');
const roleUpgrader = require('role.upgrader');

var roleHarvester = {

    roleName: "Harvester",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    transferEnergy: function(creep) {
        if(creep.transfer(Game.spawns[creep.memory.spawn], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[creep.memory.spawn], {visualizePathStyle: {
                fill: 'transparent',
                stroke: '#fff',
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .1
            }});
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
