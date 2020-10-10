var roleUpgrader = {
     harvest: function(creep) {
          let sources = creep.room.find(FIND_SOURCES);
          let source = sources[0];
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

     upgrade: function(creep) {
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller, {visualizePathStyle: {
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

          roleUpgrader.workerStateCheck(creep);

          if (!creep.memory.working)
               roleUpgrader.harvest(creep);
          else if (creep.memory.working)
               roleUpgrader.upgrade(creep);
     }
};

module.exports = roleUpgrader;
