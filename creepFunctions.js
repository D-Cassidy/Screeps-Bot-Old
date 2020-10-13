var creepFunctions = {

    getFreeSource: function(creep) {
        // loop through and check free spaces of source
        for (var name in creep.room.memory.sources) {
            var source = creep.room.memory.sources[name];
            if(source['freeSpaces'] > 0)
                return source['name'];
        }
        // if the for loop failed to get a source...
        return creep.room.memory.sources['S0']['name'];
    },

    harvest: function(creep) {
        var source = Game.getObjectById(creep.room.memory.sources[creep.memory.source]['id']);
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

    spawnDrone: function(spawn, role) {
        var body = [WORK, CARRY, MOVE, MOVE];
        var dName = "Drone " + role.charAt(0) + (Game.time % 10000);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE. ${dName} PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: {role: role, working: true, source: "S0"}});
        }
    },

    workerStateCheck: function(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true) {
            creep.memory.working = false;
            creep.memory.source = creepFunctions.getFreeSource(creep);
            creep.room.memory.sources[creep.memory.source]['freeSpaces']--;
            console.log("Subtracted one free space...");
            creep.say('BEEP BOOP');
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false) {
            creep.memory.working = true;
            creep.room.memory.sources[creep.memory.source]['freeSpaces']++;
            console.log("Added one free space...");
            creep.say('BEEP BOOP');
        }
    }
}

module.exports = creepFunctions;
