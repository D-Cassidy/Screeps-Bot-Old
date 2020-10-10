var creepFunctions = {
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
     }
}

module.exports = creepFunctions;
