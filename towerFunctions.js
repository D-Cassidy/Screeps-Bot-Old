var towerFunctions = {

    attackHostileCreeps: function(tower) {
        var creeps = tower.room.find(FIND_HOSTILE_CREEPS).filter(creep => {
            if(!creep.owner.username == 'Skitterkids') {return creep;}
        });
        tower.attack(creeps[0]);
    },

    healFriendlyCreeps: function(tower) {
        var creeps = tower.room.find(FIND_MY_CREEPS).filter(creep => {
            if(creep.hits < creep.hitsMax) {return creep;}
        });
        tower.heal(creeps[0]);
    },

    repairStructures: function(tower) {
        var structures = tower.room.find(FIND_STRUCTURES).filter(structure => {
            if(structure.hits < structure.hitsMax) {return structure;}
        });
        tower.repair(structures[0]);
    },

    runTower: function(tower) {
        // TODO:
        // Attack enemy creeps
        // Heal friendly creeps
        // Repair structures
        towerFunctions.attackHostileCreeps(tower);
        towerFunctions.healFriendlyCreeps(tower);
        towerFunctions.repairStructures(tower);
    }
};

module.exports = towerFunctions;
