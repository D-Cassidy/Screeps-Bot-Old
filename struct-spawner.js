const RoleHarvester = require('./role.harvester');
const RoleUpgrader = require('./role.upgrader');
const RoleBuilder = require('./role.builder');
const StructBase = require('./struct-base');
const Phases = require('./phases');
const creepNames = require('./creepNames')

class Spawner extends StructBase {
    constructor() {
        super(STRUCTURE_SPAWN);
    }

    displaySpawningText(spawn) {
        var percent = parseInt((spawn.spawning.needTime - spawn.spawning.remainingTime) / spawn.spawning.needTime * 100);
        spawn.room.visual.text(
            `CREATING ${spawn.spawning.name} (%${percent})`,
            spawn.pos.x + 1,
            spawn.pos.y,
            { size: '0.5', align: 'left', opacity: 0.8, font: 'bold italic 0.75 Comic Sans' }
        );
    }

    getCreepBody(spawn, panic) {
        var i, j, n, len;
        var creepBody, creepBodyBase, creepBodyCost, availableEnergy;

        creepBodyBase = [WORK, CARRY, MOVE]; // Cost: 200
        creepBodyCost = 200;
        creepBody = [];
        availableEnergy = spawn.room.find(FIND_MY_STRUCTURES).reduce((total, structure) => {
            if(structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION) {
                if(!panic) {
                    return total + structure.store.getCapacity(RESOURCE_ENERGY);
                }
                else {
                    return total + structure.store[RESOURCE_ENERGY];
                }
            }
            else return total;
        }, 0);

        len = creepBodyBase.length;
        n = parseInt(availableEnergy / creepBodyCost) - 1;
        for(i = 0; i < len; i++) {
            for(j = 0; j < n; j++) {
                creepBody.push(creepBodyBase[i]);
            }
        }
        return creepBody;
    }

    checkForSpawn(spawn, roleCount) {
        let body;
        if (roleCount.Harvester == 0) {
            console.log("ALL THE HARVESTERS ARE GONE 🦀");
            body = this.getCreepBody(spawn, true);
        }
        else {
            body = this.getCreepBody(spawn, false);
        }

        let phase = Phases.getPhaseDetails(spawn.room);
        if (roleCount.Harvester < phase.Harvester.count) {
            this.spawnDrone(spawn, body, RoleHarvester.roleName);
        }
        else if (roleCount.Upgrader < phase.Upgrader.count) {
            this.spawnDrone(spawn, body, RoleUpgrader.roleName);
        }
        else if (roleCount.Builder < phase.Builder.count) {
            this.spawnDrone(spawn, body, RoleBuilder.roleName);
        }
    }

    spawnDrone(spawn, body, role) {
        var dName = creepNames[Game.time % creepNames.length] + ' ' + role.charAt(0);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE. WELCOME ${dName}, PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: {
                role: role,
                origin: spawn.room.name,
                spawn: spawn.name,
                working: true
            }});
        }
    }

    run(spawn) {
        if(Game.time % 10 == 0) {
            var roleCount = this.roleCount(spawn.room);
            this.checkForSpawn(spawn, roleCount);
        }

        if(spawn.spawning) {
            this.displaySpawningText(spawn);
        }
    }
};

module.exports = new Spawner();
