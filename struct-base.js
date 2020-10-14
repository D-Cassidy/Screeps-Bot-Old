class StructBase {
    constructor(structureType) {
        this.structureType = structureType;
    }

    // Used to make more creeps
    roleCount() {
        var roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
            obj[creep.memory.role]++;
            if(creep.memory.working) { obj['Working']++; }
            else { obj['Slacking']++; }
            return obj;
        }, {
            Harvester: 0,
            Upgrader: 0,
            Builder: 0,
            Working: 0,
            Slacking: 0
        });

        // Print role counts
        console.log(`\nHarvesters: ${roleCount.Harvester} |`,
            `Upgraders: ${roleCount.Upgrader} |`,
            `Builders: ${roleCount.Builder} |`,
            `(Working: ${roleCount.Working}, Harvesting: ${roleCount.Slacking})`
        );

        return roleCount;
    }
}

module.exports = StructBase;
