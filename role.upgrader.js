const creepFunctions = require('creepFunctions');

var roleUpgrader = {

    roleName: "Upgrader",

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
            creepFunctions.upgrade(creep);
        }
    }
};

module.exports = roleUpgrader;
