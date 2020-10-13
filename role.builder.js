const roleHarvester = require('role.harvester');
const creepFunctions = require('creepFunctions');

var roleBuilder = {

    roleName: "Builder",

    is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },

    build: function(creep, sites) {
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

        if (!creep.memory.working) {
            creepFunctions.harvest(creep);
        }
        else if (creep.memory.working) {
            var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(sites.length == 0) {
                roleHarvester.run(creep);
            }
            else {
                roleBuilder.build(creep, sites);
            }
        }
    }
};

module.exports = roleBuilder;
