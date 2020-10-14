const StructBase = require('./struct-base');

class Tower extends StructBase {
    constructor() {
        super(STRUCTURE_TOWER);
    }

    attackHostileCreeps(tower) {
        var creeps = tower.room.find(FIND_HOSTILE_CREEPS).filter(creep => {
            if(!creep.owner.username == 'Skitterkids') {return creep;}
        });
        tower.attack(creeps[0]);
    }

    healFriendlyCreeps(tower) {
        var creeps = tower.room.find(FIND_MY_CREEPS).filter(creep => {
            if(creep.hits < creep.hitsMax) {return creep;}
        });
        tower.heal(creeps[0]);
    }

    repairStructures(tower) {
        var structures = tower.room.find(FIND_STRUCTURES).filter(structure => {
            if(structure.hits < structure.hitsMax) {return structure;}
        });
        tower.repair(structures[0]);
    }

    run(tower) {
        // TODO:
        // Attack enemy creeps
        // Heal friendly creeps
        // Repair structures
        this.attackHostileCreeps(tower);
        this.healFriendlyCreeps(tower);
        this.repairStructures(tower);
    }
};

module.exports = new Tower();
