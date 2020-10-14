const CreepsBase = require('./creeps');

const role = 'Builder';
class RoleBuilder extends CreepsBase {
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
            var sites = this.getConstructionSites(creep);
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
