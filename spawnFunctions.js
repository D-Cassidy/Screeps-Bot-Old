const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');

var spawnFunctions = {

    checkForSpawn: function (spawn, roleCount) {
        if (roleCount.Harvester < 2) {
            spawnFunctions.spawnDrone(spawn, roleHarvester.roleName);
        }
        else if (roleCount.Upgrader < 2) {
            spawnFunctions.spawnDrone(spawn, roleUpgrader.roleName);
        }
        else if (roleCount.Builder < 6) {
            spawnFunctions.spawnDrone(spawn, roleBuilder.roleName);
        }
    },

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
