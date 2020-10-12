// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const creepFunctions = require('creepFunctions');

module.exports.loop = function() {
    if (Game.time % 2 == 0)
    console.log('tick');
    else
    console.log('tock');

    for(var name in Memory.creeps) {
        if(!Game.creeps[name])
            delete Memory.creeps[name];
    }

    // Object of role counts
    const roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
        if(!obj[creep.memory.role])
            obj[creep.memory.role] = 0;
        obj[creep.memory.role]++;
        return obj;
    }, {});
    console.log(`Harvesters: ${roleCount.Harvester}, Upgraders: ${roleCount.Upgrader}, Builders: ${roleCount.Builder}`);

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (roleCount.Harvester < 3) {
            var dName = roleHarvester.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, body, dName, roleHarvester.roleName);
        }
        else if (roleCount.Upgrader < 3) {
            var dName = roleUpgrader.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, body, dName, roleUpgrader.roleName);
        }
        else if (roleCount.Builder < 2) {
            var dName = roleBuilder.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, body, dName, roleBuilder.roleName);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (roleHarvester.is(creep))
            roleHarvester.run(creep);
        else if (roleUpgrader.is(creep))
            roleUpgrader.run(creep);
        else if (roleBuilder.is(creep))
            roleBuilder.run(creep);
    }
}
