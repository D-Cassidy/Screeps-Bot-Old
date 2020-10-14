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
            var look = spacesAround[i].lookFor(LOOK_TERRAIN);
            if(look != 'wall') {
                freeSpaces.push(spacesAround[i]);
            }
        }
        return freeSpaces;
    }

    initRoomSources(room) {
        var roomMem = room.memory || room;
        var sources = room.find(FIND_SOURCES);
        var len = sources.length;
        for(var i = 0; i < len; i++) {
            if(!roomMem.sources) {
                roomMem.sources = {};
            }
            if(!roomMem.sources["S" + i]) {
                roomMem.sources["S" + i] = {};
                roomMem.sources["S" + i]['name'] = "S" + i;
                roomMem.sources["S" + i]['id'] = sources[i].id;
                roomMem.sources["S" + i]['freeSpaces'] =
                this.getFreeSpacesAround(sources[i]).length + 1;
            }
        }
    }
}

module.exports = new Room();
