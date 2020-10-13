var creepFunctions = {

    getFreeSource: function(creep) {
        var sourcesN = creep.room.find(FIND_SOURCES).length;
        for (var i = 0; i < sourcesN; i++) {
            if(creep.room.memory.sources["S" + i + " Free"] > 0)
                return "S" + i;
        }
    },

    harvest: function(creep) {
        var source = Game.getObjectById(creep.room.memory.sources[creep.memory.source]);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {
                fill: 'transparent',
                stroke: '#fff',
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .1
            }});
        }
    },

    spawnDrone: function(spawn, dName, role) {
        var body = [WORK, CARRY, MOVE, MOVE];
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE. ${dName} PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: {role: role, working: false, source: ""}});
        }
    },

    workerStateCheck: function(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true) {
            creep.memory.working = false;
            creep.memory.source = creepFunctions.getFreeSource(creep);
            creep.room.memory.sources[creep.memory.source + " Free"]--;
            creep.say('BEEP BOOP');
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false) {
            creep.memory.working = true;
            creep.room.sources[creep.memory.source + " Free"]++;
            creep.say('BEEP BOOP');
        }
    }
}

module.exports = creepFunctions;
