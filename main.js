// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const creepFunctions = require('./creepFunctions');
const roomFunctions = require('./roomFunctions');
const spawnFunctions = require('./spawnFunctions');
const towerFunctions = require('./towerFunctions');
const creepNames = require('./creepNames');

module.exports.loop = function() {
    // Tick, Tock...
    // console.log(['tick', 'tock'][Game.time % 2]);

    // Loop for dealing with creep's memory
    for(var name in Memory.creeps) {
        var creep = Memory.creeps[name];
        if(!Game.creeps[name]) {

            if(!creep.working) {
                Memory.rooms[creep.room].sources[creep.source]['freeSpaces']++;
            }

            delete Memory.creeps[name];
        }
    }

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if(Game.time % 10 == 0) {
            var roleCount = creepFunctions.roleCount();
            spawnFunctions.checkForSpawn(spawn, roleCount);
        }
        if(spawn.spawning) {
            spawnFunctions.displaySpawningText(spawn);
        }

        // Will set room source memory, if it does not exist
        if(Game.time % 1000 == 0) {
            roomFunctions.makeRoomSources(spawn);
        }
    }

    for(var name in Game.structures) {
        var structure = Game.structures[name];
        if (structure.structureType == STRUCTURE_TOWER)
            towerFunctions.runTower(structure);
    }

    // Loop for existing creeps, runs role logic
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (roleHarvester.is(creep)) {
            roleHarvester.run(creep);
        }
        else if (roleUpgrader.is(creep)) {
            roleUpgrader.run(creep);
        }
        else if (roleBuilder.is(creep)) {
            roleBuilder.run(creep);
        }
    }
}
