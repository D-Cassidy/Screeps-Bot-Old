const misc = require('./misc');

class CreepsBase {
    constructor(role) {
        this.roleName = role;
    }

    is(creep) {
        return creep.memory.role == this.roleName;
    }

    // Used to make more creeps
    roleCount() {
        var roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
            obj[creep.memory.role]++;
            if(creep.memory.working) { obj['Working']++; }
            else { obj['Slacking']++; }
            return obj;
        }, {
            Harvester: 0,
            Upgrader: 0,
            Builder: 0,
            Working: 0,
            Slacking: 0
        });

        // Print role counts
        console.log(`\nHarvesters: ${roleCount.Harvester} |`,
            `Upgraders: ${roleCount.Upgrader} |`,
            `Builders: ${roleCount.Builder} |`,
            `(Working: ${roleCount.Working}, Harvesting: ${roleCount.Slacking})`
        );

        return roleCount;
    }

    // Used by harvest to check if source has a free space
    getFreeSource(creep) {
        // loop through and check free spaces of source
        for (var name in creep.room.memory.sources) {
            var source = creep.room.memory.sources[name];
            if(source['freeSpaces'] > 0) {
                return source['name'];
            }
        }
        // if the for loop failed to get a source...
        return creep.room.memory.sources['S0']['name'];
    }

    // Swaps creep working memory between true and false
    workerStateCheck(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true) {
            creep.memory.working = false;
            creep.memory.source = this.getFreeSource(creep);
            creep.room.memory.sources[creep.memory.source]['freeSpaces']--;
            creep.say('BEEP BOOP');
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false) {
            creep.memory.working = true;
            creep.room.memory.sources[creep.memory.source]['freeSpaces']++;
            creep.say('BEEP BOOP');
        }
    }

    // Get structures creep can transfer too, sorted
    getTransferrableStructures(creep) {
        return creep.room.find(FIND_MY_STRUCTURES)
            .filter(structure => {
                if((structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    return structure;
                }
            })
            .sort((a, b) => {
                return (a.store.getUsedCapacity(RESOURCE_ENERGY) -
                    b.store.getUsedCapacity(RESOURCE_ENERGY));
            });
    }

    getConstructionSites(creep) {
        var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES).sort((a, b) => {
            return (b.progress - a.progress);
        });
        return sites;
    }

    build(creep, sites) {
        if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sites[0], {visualizePathStyle: misc.pathStyle});
        }
    }

    // Harvests using creep's memory of source
    harvest(creep) {
        var source = Game.getObjectById(creep.room.memory.sources[creep.memory.source]['id']);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: misc.pathStyle});
        }
    }

    transferEnergy(creep, structures) {
        if(creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structures[0], {visualizePathStyle: misc.pathStyle});
        }
    }

    upgrade(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: misc.pathStyle});
        }
    }
}

module.exports = CreepsBase;
