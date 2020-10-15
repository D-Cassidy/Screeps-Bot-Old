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
    checkForSpawn(spawn, roleCount) {
        let phase = Phases.getPhaseDetails(spawn.room);
        let memory = {
            role: '',
            origin: spawn.room.name,
            spawn: spawn.name,
            sourceId: '',
            working: true
        };
        if (roleCount.Harvester < phase.Harvester.count) {
            memory.role = RoleHarvester.roleName;
            this.spawnDrone(spawn, memory);
        }
        else if (roleCount.Upgrader < phase.Upgrader.count) {
            memory.role = RoleUpgrader.roleName;
            this.spawnDrone(spawn, memory);
        }
        else if (roleCount.Builder < phase.Builder.count) {
            memory.role = RoleUpgrader.roleName;
            this.spawnDrone(spawn, memory);
        }
        else if (roleCount['Remote-Miner'] < phase['Remote-Miner'].count) {
            memory.role = RoleRemoteMiner.roleName;
            memory.shardWide = true;
            this.spawnDrone(spawn, memory);
        }
    }
    spawnDrone(spawn, memory) {
        let phase = Phases.getPhaseDetails(spawn.room);
        let body = this.getCreepBody(spawn, phase[memory.role].body);
        if(!body || body.length == 0 || this.getCreepBodyCost(body) < phase[memory.role].minEnergyToSpawn) {
            return;
        }

        let dName = creepNames[Game.time % creepNames.length] + ' ' + memory.role.charAt(0);
        if (spawn.spawnCreep(body, dName, {dryRun: true}) == OK) {
            console.log(`CREATING DRONE IN ${spawn.room.name}. WELCOME ${dName}, PLEASE ENJOY YOUR SHORT EXISTENCE`);
            spawn.spawnCreep(body, dName, {memory: memory});
        }
    }
    getCreepBody(spawn, creepBodyBase) {
        // Get available energy within room
        let creepBody = [], availableEnergy;
        availableEnergy = spawn.room.find(FIND_MY_STRUCTURES).reduce((total, structure) => {
            if(structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION) {
                return total + structure.store[RESOURCE_ENERGY];
            }
            else return total;
        }, 0);
        // Create the maximum combination of creepBodyBase with available energy
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
    // Flavor, displays text next to spawn while creep is spawning
    displaySpawningText(spawn) {
        var percent = parseInt((spawn.spawning.needTime - spawn.spawning.remainingTime) / spawn.spawning.needTime * 100);
        spawn.room.visual.text(
            `CREATING ${spawn.spawning.name} (%${percent})`,
            spawn.pos.x + 1,
            spawn.pos.y,
            { size: '0.5', align: 'left', opacity: 0.8, font: 'bold italic 0.75 Comic Sans' }
        );
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
