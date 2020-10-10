// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('role.harvester');

module.exports.loop = function() {
     for(let name in Memory.creeps) {
          if(!Game.creeps[name])
               delete Memory.creeps[name];
     }

     for(let name in Game.creeps) {
          let creep = Game.creeps[name];
          if (creep.memory.role == 'harvester')
               roleHarvester.run(creep);
     }
}
