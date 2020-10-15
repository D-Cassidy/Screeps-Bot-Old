const Phases = require('./phases');

class Room {
    initRoomMemory(room) {
        let roomMem = room.memory || room;
        if(!roomMem.phase) {
            console.log(`Initializing Phase No. in ${room.name}`);
            roomMem.phase = Phases.getCurrentPhaseNo(room);
        }
    }
    getSpacesAround(object) {
        let spaces = [];
        // Top Row
        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y - 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x, object.pos.y - 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y - 1, object.room.name));
        // Middle Row
        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y, object.room.name));
        // Bottom Row
        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y + 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x, object.pos.y + 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y + 1, object.room.name));

        return spaces;
    }
    getFreeSpacesAround(object) {
        let spacesAround = this.getSpacesAround(object);
        let freeSpaces = [];
        let len = spacesAround.length;
        for (var i = 0; i < len; i++) {
            if(spacesAround[i].lookFor(LOOK_TERRAIN) != 'wall' && spacesAround[i].lookFor(LOOK_CREEPS).length == 0) {
                freeSpaces.push(spacesAround[i]);
            }
        }
        return freeSpaces;
    }
}

module.exports = new Room();
