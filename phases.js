var Phases = [
    {}, // Controller Level 0...
    { // Controller Level 1
        Level: 1,
        Harvester: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 2,
            minEnergyToSpawn: 250
        },
        Upgrader: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 4,
            minEnergyToSpawn: 250
        },
        Builder: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 4,
            minEnergyToSpawn: 250
        },
        'Remote-Miner': {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 0,
            minEnergyToSpawn: 250
        }
    },
    { // Controller Level 2
        Level: 2,
        Harvester: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 2,
            minEnergyToSpawn: 250
        },
        Upgrader: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 4,
            minEnergyToSpawn: 250
        },
        Builder: {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 2,
            minEnergyToSpawn: 250
        },
        'Remote-Miner': {
            body: [WORK, CARRY, MOVE, MOVE],
            count: 0,
            minEnergyToSpawn: 250
        }
    },
    { // Controller Level 3
        Level: 3,
        Harvester: {
            body: [WORK, WORK, CARRY, MOVE],
            count: 2,
            minEnergyToSpawn: 300
        },
        Upgrader: {
            body: [WORK, CARRY, MOVE],
            count: 2,
            minEnergyToSpawn: 250
        },
        Builder: {
            body: [WORK, CARRY, MOVE],
            count: 2,
            minEnergyToSpawn: 250
        },
        'Remote-Miner': {
            body: [WORK, WORK, CARRY, MOVE],
            count: 2,
            minEnergyToSpawn: 300
        }
    }
];

Phases.getPhaseDetails = function(room) {
    let phaseNo = room.memory.phase;
    while(!Phases[phaseNo]) {
        phaseNo--;
        if(phaseNo == 0) {
            console.log(`Phase does not exist`);
            return false;
        }
    }
    return Phases[phaseNo];
}
Phases.getCurrentPhaseNo = function(room) {
    return room.memory.phase || 1;
}
Phases.checkPhaseNo = function(room) {
    if(room.controller.level > room.memory.phase) {
        console.log(`Room ${room.name} has completed phase ${room.memory.phase}, moving to phase ${room.memory.phase + 1}`);
        room.memory.phase++;
    }
}

module.exports = Phases;
