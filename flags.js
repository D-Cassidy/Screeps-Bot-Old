const Room = require('./room');

class Flag {
    getCheckerBoardAround(pos, size, odd) { // even works, odd does not
        let i, j, x, y, positions = [];
        x = pos.x - parseInt(size / 2);
        y = pos.y - parseInt(size / 2);
        for(i = odd; i < size; i++) {
            for(j = 0; j < size; j += 2) {
                if(j + (i%2) >= size) continue;
                positions.push(new RoomPosition(x + j + (i%2), y + i, pos.roomName));
            }
        }
        return positions;
    }
};

module.exports = new Flag();
