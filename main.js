// THE SCREEPS COLONY
// ------------------
const RoleHarvester = require('./role.harvester');
const RoleUpgrader = require('./role.upgrader');
const RoleBuilder = require('./role.builder');
const Tower = require('./struct-tower');
const Spawner = require('./struct-spawner');
const roomFunctions = require('./roomFunctions');
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

    for(var name in Game.rooms) {
        let room = Game.rooms[name];
        let structures = room.find(FIND_MY_STRUCTURES);
        for(var name in structures) {
            let s = structures[name];
            if(s.structureType == Spawner.structureType) {
                var roleCount = creepFunctions.roleCount();
                Spawner.checkForSpawn(s, roleCount);
                if(spawn.spawning) {
                    Spawner.displaySpawningText(s);
                }
                if(Game.time % 1000 == 0) {
                    roomFunctions.makeRoomSources(spawn);
                }
            }
            else if(s.structureType == Tower.structureType) {
                Tower.runTower(structure);
            }
        }
    }

    // Loop for existing creeps, runs role logic
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(RoleHarvester.is(creep)) {
            RoleHarvester.run(creep);
        }
        else if(RoleUpgrader.is(creep)) {
            RoleUpgrader.run(creep);
        }
        else if(RoleBuilder.is(creep)) {
            RoleBuilder.run(creep);
        }
    }
}
