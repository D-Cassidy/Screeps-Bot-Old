const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const creepNames = require('./creepNames')

var spawnFunctions = {

    getCreepBody: function(spawn, panic) {
        var i, j, n, len;
        var creepBody, creepBodyBase, creepBodyCost, availableEnergy;

        creepBodyBase = [WORK, CARRY, MOVE]; // Cost: 200
        creepBodyCost = 200;
        creepBody = [];
        availableEnergy = spawn.room.find(FIND_MY_STRUCTURES).reduce((total, structure) => {
            if(structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION) {
                if(!panic) {
                    return total + structure.store.getCapacity(RESOURCE_ENERGY);
                }
                else {
                    return total + structure.store[RESOURCE_ENERGY];
                }
            }
            else return total;
        }, 0);

        len = creepBodyBase.length;
        n = parseInt(availableEnergy / creepBodyCost);
        for(i = 0; i < len; i++) {
            for(j = 0; j < n; j++) {
                creepBody.push(creepBodyBase[i]);
            }
        }
        return creepBody;
    },

    checkForSpawn: function (spawn, roleCount) {
        var body;
        if (roleCount.Harvester == 0) {
            body = spawnFunctions.getCreepBody(spawn, true); // 250
        }
        else {
            body = spawnFunctions.getCreepBody(spawn, false); // 600
        }

        if (roleCount.Harvester < 2) {
            spawnFunctions.spawnDrone(spawn, body, roleHarvester.roleName);
        }
        else if (roleCount.Upgrader < 2) {
            spawnFunctions.spawnDrone(spawn, body, roleUpgrader.roleName);
        }
        else if (roleCount.Builder < 3) {
            spawnFunctions.spawnDrone(spawn, body, roleBuilder.roleName);
        }
    },

    spawnDrone: function(spawn, body, role) {
        var dName = creepNames[Game.time % creepNames.length] + ' ' + role.charAt(0);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE. PLEASE ENJOY YOUR SHORT EXISTENCE ${dName}`);
            spawn.spawnCreep(body, dName, {memory: {
                role: role,
                room: spawn.room.name,
                source: "S" + 0,
                spawn: spawn.name,
                working: true
            }});
        }
    }
};

module.exports = spawnFunctions;
