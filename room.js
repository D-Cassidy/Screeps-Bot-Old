const Phases = require('./phases');

class Room {

    getSpacesAround(object) {
        var spaces = [];
        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y - 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x, object.pos.y - 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y - 1, object.room.name));

        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y, object.room.name));

        spaces.push(new RoomPosition(object.pos.x - 1, object.pos.y + 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x, object.pos.y + 1, object.room.name));
        spaces.push(new RoomPosition(object.pos.x + 1, object.pos.y + 1, object.room.name));

        return spaces;
    }

    getFreeSpacesAround(object) {
        var spacesAround = this.getSpacesAround(object);
        var freeSpaces = [];
        var len = spacesAround.length;
        for (var i = 0; i < len; i++) {
            if(spacesAround[i].lookFor(LOOK_TERRAIN) != 'wall' && spacesAround[i].lookFor(LOOK_CREEPS)) {
                freeSpaces.push(spacesAround[i]);
            }
        }
        return freeSpaces;
    }

    initRoomMemory(room) {
        var roomMem = room.memory || room;

        // Phase Memory
        if(!roomMem.phase) {
            console.log(`Initializing Phase No. in ${room.name}`);
            roomMem.phase = Phases.getCurrentPhaseNo(room);
        }
    }
}

module.exports = new Room();
