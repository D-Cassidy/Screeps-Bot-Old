const CreepsBase = require('./creeps');

const role = 'Harvester';
class RoleHarvester extends CreepsBase {
    constructor() {
        super(role);
    }

    /*is: function(creep) {
        return (creep.memory.role == this.roleName) ? true : false;
    }*/

    run(creep) {

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
