const roleUpgrader = require('role.upgrader');

var roleHarvester = {
     harvest: function(creep) {
          let sources = creep.room.find(FIND_SOURCES);
          let source = sources[1];
          if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
               creep.moveTo(source, {visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#fff',
                    lineStyle: 'dashed',
                    strokeWidth: .15,
                    opacity: .1
               }});
          }
     },

     transferEnergy: function(creep) {
          if(creep.transfer(Game.spawns['HIVE ALPHA'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.moveTo(Game.spawns['HIVE ALPHA'], {visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#fff',
                    lineStyle: 'dashed',
                    strokeWidth: .15,
                    opacity: .1
               }});
          }
     },

     workerStateCheck: function(creep) {
          if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true) {
               creep.memory.working = false;
               creep.say('BEEP BOOP');
          }
          else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false) {
               creep.memory.working = true;
               creep.say('BEEP BOOP');
          }
     },

     /** @param {Creep} creep **/
     run: function(creep) {

          roleHarvester.workerStateCheck(creep);

          if (!creep.memory.working)
               roleHarvester.harvest(creep);
          else if (creep.memory.working) {
               if (Game.spawns['HIVE ALPHA'].store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                    roleUpgrader.run(creep);
               roleHarvester.transferEnergy(creep);
          }
     }
};

module.exports = roleHarvester;
