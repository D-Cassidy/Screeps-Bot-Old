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

    for(let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if(!creep)
            delete Memory.creeps[name];
    }

    // Object of role counts
    const roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
        if(!obj[creep.memory.role])
            obj[creep.memory.role] = 0;
        obj[creep.memory.role]++;
        return obj;
    }, {})

    console.log(`Harvesters: ${roleCount.harvester}, Upgraders: ${roleCount.upgrader}, Builders: ${roleCount.builder}`);

    let body = [WORK, CARRY, MOVE, MOVE];
    for(let name in Game.spawns) {
        let spawn = Game.spawns[name];
        if (roleCount.harvester < 3) {
            let dName = "Drone H" + (Game.time % 10000);
            spawnDrone(spawn, body, dName, 'harvester');
        }
        else if (roleCount.upgrader < 3) {
            let dName = "Drone U" + (Game.time % 10000);
            spawnDrone(spawn, body, dName, 'upgrader');
        }
        else if (roleCount.builder < 2) {
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
