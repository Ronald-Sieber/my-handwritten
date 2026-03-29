import deleteHandler from './behavior/deleteHandler.js'
import getHandler from './behavior/getHandler.js'
import setHandler from './behavior/setHandler.js'
import hasHandler from './behavior/hasHandler.js'
import ownHandler from './behavior/ownHandler.js'

export default {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  has: hasHandler,
  ownKeys: ownHandler,
}
