// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const creepFunctions = require('creepFunctions');
const roomFunctions = require('roomFunctions');

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
    }, {
        Harvester: 0,
        Upgrader: 0,
        Builder: 0
    });
    console.log(`Harvesters: ${roleCount.Harvester}, Upgraders: ${roleCount.Upgrader}, Builders: ${roleCount.Builder}`);

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (roleCount.Harvester < 3) {
            var dName = "Drone " + roleHarvester.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, dName, roleHarvester.roleName);
        }
        else if (roleCount.Upgrader < 3) {
            var dName = "Drone " + roleUpgrader.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, dName, roleUpgrader.roleName);
        }
        else if (roleCount.Builder < 2) {
            var dName = "Drone " + roleBuilder.roleName.charAt(0) + (Game.time % 10000);
            creepFunctions.spawnDrone(spawn, dName, roleBuilder.roleName);
        }

        if(Game.time % 100 == 0) {
            for(var rName in Memory.rooms) {
                var room = Memory.rooms[rName];
                var sources = spawn.room.find(FIND_SOURCES);
                roomFunctions.makeRoomSources(room, sources);
                roomFunctions.makeFreeSpacesAround(room, sources);
            }
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
