class StructBase {
    constructor(structureType) {
        this.structureType = structureType;
    }

    // Used to make more creeps
    roleCount(room) {
        var roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
            if(creep.memory.origin == room.name || creep.memory.room == room.name || creep.memory.shardWide) {
                obj[creep.memory.role]++;
                if(creep.memory.working) { obj['Working']++; }
                else { obj['Slacking']++; }
                return obj;
            }
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
