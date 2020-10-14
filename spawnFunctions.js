const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');

var spawnFunctions = {

    checkForSpawn: function (spawn, roleCount) {
        if (roleCount.Harvester == 0) {
            var body = [WORK, CARRY, MOVE, MOVE]; // 250
        }
        else {
            var body = [WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE]; // 700
        }

        if (roleCount.Harvester < 2) {
            spawnFunctions.spawnDrone(spawn, body, roleHarvester.roleName);
        }
        else if (roleCount.Upgrader < 2) {
            spawnFunctions.spawnDrone(spawn, body, roleUpgrader.roleName);
        }
        else if (roleCount.Builder < 2) {
            spawnFunctions.spawnDrone(spawn, body, roleBuilder.roleName);
        }
    },

    spawnDrone: function(spawn, body, role) {
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
