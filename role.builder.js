const creepFunctions = require('creepFunctions');

var roleBuilder = {

    build: function(creep) {
        let sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        let site = sites[0];
        if(creep.build(site) == ERR_NOT_IN_RANGE) {
            creep.moveTo(site, {visualizePathStyle: {
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
        roleBuilder.build(creep);
    }
};

module.exports = roleBuilder;
