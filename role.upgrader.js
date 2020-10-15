const CreepsBase = require('./creeps');

class RoleUpgrader extends CreepsBase {
    constructor() {
        super('Upgrader');
    }
    run(creep) {
        this.suicideCheck(creep);
        this.workerStateCheck(creep);
        if (!creep.memory.working) {
            this.harvest(creep);
        }
        else {
            this.upgrade(creep);
        }
    }
};

module.exports = new RoleUpgrader();
