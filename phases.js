var Phases = [
    {}, // Controller Level 0...
    { // Controller Level 1
        Level: 1,

        Harvester: {
            count: 4
        },
        Upgrader: {
            count: 4
        },
        Builder: {
            count: 0
        }
    },
    { // Controller Level 2
        Level: 2,

        Harvester: {
            count: 2
        },
        Upgrader: {
            count: 4
        },
        Builder: {
            count: 2
        }
    },
    { // Controller Level 3
        Level: 3,

        Harvester: {
            count: 2
        },
        Upgrader: {
            count: 2
        },
        Builder: {
            count: 4
        }
    }
];

Phases.getPhaseDetails = function(room) {
    let phaseNo = room.memory.phase;
    while(!Phases[phaseNo]) {
        phaseNo--;
        if(phaseNo == 0) {
            console.log(`Phase does not exist in ${room.name}`);
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
