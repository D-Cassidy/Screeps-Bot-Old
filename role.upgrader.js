const creepFunctions = require('creepFunctions');

var roleUpgrader = {

    roleName: "Upgrader",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    upgrade: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {
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

        if (!creep.memory.working)
        creepFunctions.harvest(creep);
        else if (creep.memory.working)
        roleUpgrader.upgrade(creep);
    }
};

module.exports = roleUpgrader;
