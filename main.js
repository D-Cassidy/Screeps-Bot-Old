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
        obj[creep.memory.role]++;
        if(creep.memory.working)
            obj['Working']++;
        else
            obj['Slacking']++;
        return obj;
    }, {
        Harvester: 0,
        Upgrader: 0,
        Builder: 0,
        Working: 0,
        Slacking: 0
    });
    console.log(`Harvesters: ${roleCount.Harvester}, Upgraders: ${roleCount.Upgrader}, Builders: ${roleCount.Builder}, (Working: ${roleCount.Working}, Harvesting: ${roleCount.Slacking})`);

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (roleCount.Harvester < 2)
            creepFunctions.spawnDrone(spawn, roleHarvester.roleName);
        else if (roleCount.Upgrader < 2)
            creepFunctions.spawnDrone(spawn, roleUpgrader.roleName);
        else if (roleCount.Builder < 4)
            creepFunctions.spawnDrone(spawn, roleBuilder.roleName);

        if(Game.time % 1000 == 0) {
            var room = spawn.room.memory;
            var sources = spawn.room.find(FIND_SOURCES);
            roomFunctions.makeRoomSources(room, sources);
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
