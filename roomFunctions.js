var roomFunctions = {

    makeRoomSources: function(room, sources) {
        var len = sources.length;
        for(var i = 0; i < len; i++) {
            if(!room.sources) {
                room.sources = {};
            }
            if(!room.sources["S" + i]) {
                room.sources["S" + i] = {};
                room.sources["S" + i]['name'] = "S" + i;
                room.sources["S" + i]['id'] = sources[i].id;
                room.sources["S" + i]['freeSpaces'] =
                roomFunctions.getFreeSpacesAround(sources[i]).length + 1;
            }
        }
    },

    getSpacesAround: function(object) {
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
    },

    getFreeSpacesAround: function(object) {
        var spacesAround = roomFunctions.getSpacesAround(object);
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
}

module.exports = roomFunctions;
