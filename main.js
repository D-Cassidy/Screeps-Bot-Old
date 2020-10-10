// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

function spawnDrone(spawn, body, dName, role) {
    if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
        console.log(`CREATING NEW DRONE ${dName} PLEASE ENJOY YOUR SHORT EXISTENCE`);
        spawn.spawnCreep(body, dName, {memory: {role: role, working: false}});
    }
}

module.exports.loop = function() {
    if (Game.time % 2 == 0)
    console.log('tick');
    else
    console.log('tock');

    let hCount = 0, uCount = 0, bCount = 0;
    for(let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if(!creep) {
            delete Memory.creeps[name];
            continue;
        }

        if(creep.memory.role == 'harvester')
        hCount += 1;
        else if(creep.memory.role == 'upgrader')
        uCount += 1;
        else if(creep.memory.role == 'builder')
        bCount += 1;
    }

    console.log(`Harvesters: ${hCount}, Upgraders: ${uCount}, Builders: ${bCount}`);

    let body = [WORK, CARRY, MOVE, MOVE];
    for(let name in Game.spawns) {
        let spawn = Game.spawns[name];
        if (hCount < 3) {
            let dName = "Drone H" + (Game.time % 10000);
            spawnDrone(spawn, body, dName, 'harvester');
        }
        else if (uCount < 3) {
            let dName = "Drone U" + (Game.time % 10000);
            spawnDrone(spawn, body, dName, 'upgrader');
        }
        else if (bCount < 2) {
            let dName = "Drone B" + (Game.time % 10000);
            spawnDrone(spawn, body, dName, 'builder');
        }
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester')
        roleHarvester.run(creep);
        else if (creep.memory.role == 'upgrader')
        roleUpgrader.run(creep);
        else if (creep.memory.role == 'builder')
        roleBuilder.run(creep);
    }
}
