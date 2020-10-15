const Room = require('./room');
const misc = require('./misc');

class CreepsBase {
    constructor(role) {
        this.roleName = role;
    }
    is(creep) {
        return creep.memory.role == this.roleName;
    }
    suicideCheck(creep) {
        if(creep.ticksToLive == 1) {
            console.log(`For the greater good, ${creep.name} must commit Sepuku.`);
            creep.suicide();
        }
    }
    // Used by harvest to check if source has a free space
    getFreeSource(creep) {
        let sources = creep.room.find(FIND_SOURCES);
        for(let i = 0; i < sources.length; i++) {
            if(Room.getFreeSpacesAround(sources[i]).length > 0) {
                return sources[i].id;
            }
        }
        return sources[0].id;
    }
    // Get structures creep can transfer too, sorted
    getTransferrableStructures(creep) {
        let room = Game.rooms[creep.memory.origin];
        return room.find(FIND_MY_STRUCTURES)
            .filter(structure => {
                if((structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    return structure;
                }
            })
            .sort((a, b) => {
                return (misc.structurePriority[b.structureType] - misc.structurePriority[a.structureType]);
            });
    }
    getConstructionSites(creep) {
        var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES).sort((a, b) => {
            return (b.progress - a.progress);
        });
        return sites;
    }
    // Swaps creep working memory between true and false
    workerStateCheck(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true) {
            creep.memory.working = false;
            creep.memory.sourceId = this.getFreeSource(creep);
            creep.say('BEEP BOOP');
        }
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false) {
            creep.memory.working = true;
            delete creep.memory.sourceId;
            creep.say('BEEP BOOP');
        }
    }
    build(creep, sites) {
        if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sites[0], {visualizePathStyle: misc.pathStyle});
        }
    }
    // Harvests using creep's memory of source
    harvest(creep) {
        var source = Game.getObjectById(creep.memory.sourceId);
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
