const CreepsBase = require('./creeps');

class RoleHarvester extends CreepsBase {
    constructor() {
        super('Harvester');
    }
    run(creep) {
        this.suicideCheck(creep);
        this.workerStateCheck(creep);
        if (!creep.memory.working) {
            this.harvest(creep);
        }
        else {
            var structures = this.getTransferrableStructures(creep);
            if(structures.length == 0) {
                roleUpgrader.run(creep);
            }
            else {
                this.transferEnergy(creep, structures);
            }
        }
    }
};

module.exports = new RoleHarvester();
