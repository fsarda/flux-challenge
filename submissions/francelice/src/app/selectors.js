import {UNDEFINED_SITH} from '../modules/items'

const hasInfo = (indexTable, infoTable, index, sith) => (
    indexTable[index]===UNDEFINED_SITH || 
    (infoTable[indexTable[index]] && !infoTable[indexTable[index]].info) || 
    (infoTable[indexTable[index]].info[sith].id) 
)
//Returns true if there are still more masters to scroll
export const getStateFirstMasterOnTop = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable, 0, 'master')

//Returns true if there are still more apprentices to scroll
export const getStateLastApprenticeOnBottom = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable, indexTable.length - 1, 'apprentice') 

//Returns true if there are no siths fetched on the list
export const getStateNoSiths =  ({indexTable}) =>  indexTable.filter(item => item!==UNDEFINED_SITH).filter(item => item!==null).length <= 2 

//Returns true if obi-wan is in a dangerous planet
export const getStateIsVisitingDangerousPlanet =  ({indexTable, infoTable}, {name}) => (
    indexTable
        .filter(item => infoTable[item])
        .filter(item => infoTable[item].info)
        .map(item => infoTable[item].info.homeworld.name)
        .filter((item) => item  === name).length !== 0)

//Returns the sith's list on the current planet
export const getStateDangerousSithsIndex =  ({indexTable, infoTable}, {name}) => (
    indexTable
        .map(item => infoTable[item])
        .filter(item => item && item.info)
        .filter(item => item.info.homeworld.name === name)
        .map(item => item.id)
)
    
//Maps the actual sith information on every slot
export const getStateSithList = ({indexTable, infoTable}) => (indexTable.map(item => infoTable[item]).map((item, i) => item && item.info?item.info:{id: i, name: "", homeworld:{name: ""}}))