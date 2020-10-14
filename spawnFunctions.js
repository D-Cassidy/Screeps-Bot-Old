var spawnFunctions = {
    spawnDrone: function(spawn, role) {
        var body = [WORK, CARRY, MOVE, MOVE];
        var dName = "Drone " + role.charAt(0) + (Game.time % 10000);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE. ${dName} PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: {
                role: role,
                room: spawn.room.name,
                source: "S" + 0,
                spawn: spawn.name,
                working: true
            }});
        }
    }
};

module.exports = spawnFunctions;
