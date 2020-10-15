const CreepsBase = require('./creeps');
const misc = require('./misc');

class RoleRemoteMiner extends CreepsBase {
    constructor() {
        super('Remote-Miner')
    }
    run(creep) {
        this.suicideCheck(creep);
        this.workerStateCheck(creep);
        if(!creep.memory.working) {
            if(creep.room.name == creep.memory.origin) {
                let exit = creep.room.find(FIND_EXIT)[0];
                creep.moveTo(exit, {visualizePathStyle: misc.pathStyle});
            }
            else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES);
                creep.memory.sourceId = source.id;
                this.harvest(creep);
            }
        }
        else {
            var structures = this.getTransferrableStructures(creep);
            this.transferEnergy(creep, structures);
        }
    }
};

module.exports = new RoleRemoteMiner();
