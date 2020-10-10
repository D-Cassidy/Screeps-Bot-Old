var roleHarvester = {

     /** @param {Creep} creep **/
     run: function(creep) {
          if(creep.store.getFreeCapacity() > 0) {
               var sources = creep.room.find(FIND_SOURCES);
               if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {
                         fill: 'transparent',
                         stroke: '#fff',
                         lineStyle: 'dashed',
                         strokeWidth: .15,
                         opacity: .1
                    }});
               }
          }
          else {
               if(creep.transfer(Game.spawns['HIVE ALPHA'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['HIVE ALPHA'], {visualizePathStyle: {
                         fill: 'transparent',
                         stroke: '#fff',
                         lineStyle: 'dashed',
                         strokeWidth: .15,
                         opacity: .1
                    }});
               }
          }
     }
};

module.exports = roleHarvester;
