class StructBase {
    constructor(structureType) {
        this.structureType = structureType;
    }
    // Counts roles within a room
    roleCount(room) {
        var roleCount = Object.values(Game.creeps).reduce((obj, creep) => {
            if(creep.memory.origin == room.name || creep.memory.shardWide) {
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
            'Remote-Miner': 0,
            Working: 0,
            Slacking: 0
        });
        // Print role counts
        console.log(`Harvesters: ${roleCount.Harvester} |`,
            `Upgraders: ${roleCount.Upgrader} |`,
            `Builders: ${roleCount.Builder} |`,
            `Remote-Miners: ${roleCount['Remote-Miner']} |`,
            `(Working: ${roleCount.Working}, Harvesting: ${roleCount.Slacking})`,
            `in ${room.name}`
        );
        return roleCount;
    }
}

module.exports = StructBase;
