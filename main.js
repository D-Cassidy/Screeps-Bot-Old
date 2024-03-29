// THE SCREEPS COLONY
// ------------------
const RoleHarvester = require('./role.harvester');
const RoleUpgrader = require('./role.upgrader');
const RoleBuilder = require('./role.builder');
const RoleRemoteMiner = require('./role.remote-miner');
const Tower = require('./struct-tower');
const Spawner = require('./struct-spawner');
const Room = require('./room');
const Phases = require('./phases');

module.exports.loop = function() {
    // Tick, Tock...
    // console.log(['tick', 'tock'][Game.time % 2]);

    // console.log(Flag.getCheckerBoardAround(new RoomPosition(25, 25, 'W2S15'), 7, 0));
    // console.log(Flag.getCheckerBoardAround(new RoomPosition(25, 25, 'W2S15'), 7, 1));

    // Loop for dealing with creep's memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for(let name in Game.rooms) {
        let room = Game.rooms[name];
        Room.initRoomMemory(room);
        Phases.checkPhaseNo(room);

        let structures = room.find(FIND_MY_STRUCTURES);
        for(let name in structures) {
            let s = structures[name];
            if(s.structureType == Spawner.structureType) {
                Spawner.run(s);
            }
            else if(s.structureType == Tower.structureType) {
                Tower.run(s);
            }
        }
    }

    // Loop for existing creeps, runs role logic
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(RoleHarvester.is(creep)) RoleHarvester.run(creep);
        else if(RoleUpgrader.is(creep)) RoleUpgrader.run(creep);
        else if(RoleBuilder.is(creep)) RoleBuilder.run(creep);
        else if(RoleRemoteMiner.is(creep)) RoleRemoteMiner.run(creep);
    }
}
