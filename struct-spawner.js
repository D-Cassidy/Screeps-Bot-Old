const RoleHarvester = require('./role.harvester');
const RoleUpgrader = require('./role.upgrader');
const RoleBuilder = require('./role.builder');
const RoleRemoteMiner = require('./role.remote-miner');
const StructBase = require('./struct-base');
const Phases = require('./phases');
const creepNames = require('./creepNames')
const constants = require('./constants');

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

    getCreepBody(spawn, creepBodyBase) {
        let creepBody = [], availableEnergy;
        availableEnergy = spawn.room.find(FIND_MY_STRUCTURES).reduce((total, structure) => {
            if(structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION) {
                return total + structure.store[RESOURCE_ENERGY];
            }
            else return total;
        }, 0);

        let i, j, n, len, creepBodyCost;
        creepBodyCost = this.getCreepBodyCost(creepBodyBase);
        len = creepBodyBase.length;
        n = parseInt(availableEnergy / creepBodyCost);
        for(i = 0; i < len; i++) {
            for(j = 0; j < n; j++) {
                creepBody.push(creepBodyBase[i]);
            }
        }

        return creepBody;
    }

    getCreepBodyCost(body) {
        let i, len, cost = 0;
        len = body.length;
        for(i = 0; i < len; i++) {
            cost += constants[body[i].toUpperCase()];
        }
        return cost;
    }

    checkForSpawn(spawn, roleCount) {
        let phase = Phases.getPhaseDetails(spawn.room);
        if (roleCount.Harvester < phase.Harvester.count) {
            this.spawnDrone(spawn, RoleHarvester.roleName, false);
        }
        else if (roleCount.Upgrader < phase.Upgrader.count) {
            this.spawnDrone(spawn, RoleUpgrader.roleName, false);
        }
        else if (roleCount.Builder < phase.Builder.count) {
            this.spawnDrone(spawn, RoleBuilder.roleName, false);
        }
        else if (roleCount['Remote-Miner'] < phase['Remote-Miner'].count) {
            this.spawnDrone(spawn, RoleRemoteMiner.roleName, true);
        }
    }

    spawnDrone(spawn, role, shardwide) {
        let phase = Phases.getPhaseDetails(spawn.room);
        let body = this.getCreepBody(spawn, phase[role].body);
        if(!body || body.length == 0 || this.getCreepBodyCost(body) < phase[role].minEnergyToSpawn) {
            return;
        }

        let dName = creepNames[Game.time % creepNames.length] + ' ' + role.charAt(0);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE IN ${spawn.room.name}. WELCOME ${dName}, PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: {
                role: role,
                origin: spawn.room.name,
                spawn: spawn.name,
                sourceId: '',
                shardWide: shardwide,
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
