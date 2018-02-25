import {CHANGE_USER} from './constants'


export const changeUser = user => {
  return {
    type:CHANGE_USER,
    user
  }
}
