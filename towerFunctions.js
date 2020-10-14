var towerFunctions = {

    repairStructures: function(tower) {
        var structures = tower.room.find(FIND_STRUCTURES).filter(structure => {
            if(structure.hits < structure.hitsMax) { return structure; }
        });
        tower.repair(structures[0]);
    },

    runTower: function(tower) {
        // TODO:
        // Attack enemy creeps
        // Heal friendly creeps
        // Repair structures
        towerFunctions.repairStructures(tower);
    }
};

module.exports = towerFunctions;
