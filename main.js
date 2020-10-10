// THE SCREEPS COLONY
// ------------------
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports.loop = function() {
     if (Game.time % 2 == 0)
          console.log('tick');
     else
          console.log('tock');

     let hCount = 0, uCount = 0;

     for(let name in Memory.creeps) {
          let creep = Game.creeps[name];
          if(!creep)
               delete Memory.creeps[name];
          else if(creep.memory.role == 'harvester')
               hCount += 1;
          else if(creep.memory.role == 'upgrader')
               uCount += 1;
     }

     console.log(`Harvesters: ${hCount}, Upgraders: ${uCount}`);

     let body = [WORK, CARRY, MOVE, MOVE];
     for(let name in Game.spawns) {
          let spawn = Game.spawns[name];
          if (hCount < 3) {
               let dName = "Drone H" + (Game.time % 10000);
               spawn.spawnCreep(body, dName, {memory: {role: 'harvester'}});
          }
          else if (uCount < 3) {
               let dName = "Drone U" + (Game.time % 10000);
               spawn.spawnCreep(body, dName, {memory: {role: 'upgrader'}});
          }
     }

     for(let name in Game.creeps) {
          let creep = Game.creeps[name];
          if (creep.memory.role == 'harvester')
               roleHarvester.run(creep);
          else if (creep.memory.role == 'upgrader')
               roleUpgrader.run(creep);
     }
}
