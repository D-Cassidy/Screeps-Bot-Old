const CreepsBase = require('./creeps');

class RoleBuilder extends CreepsBase {
    constructor() {
        super('Builder');
    }
    run(creep) {
        this.suicideCheck(creep);
        this.workerStateCheck(creep);
        if (!creep.memory.working) {
            this.harvest(creep);
        }
        else {
            let sites = this.getConstructionSites(creep);
            if(sites.length == 0) {
                this.run(creep);
            }
            else {
                this.build(creep, sites);
            }
        }
    }
};

module.exports = new RoleBuilder();
