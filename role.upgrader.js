const CreepsBase = require('./creeps');

const role = 'Upgrader';
class RoleUpgrader extends CreepsBase {
    constructor() {
        super(role);
    }

    /*is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    },*/

    run(creep) {
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
