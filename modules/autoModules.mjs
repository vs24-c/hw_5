import managerAuto from '../util/managerAuto.mjs';
import {v4 as uuidv4} from 'uuid';

class Auto {
  //------------read object----------------//
  static loadAutoList() {
    try {
      return managerAuto.loadDataAuto();
    } catch (error) {
      throw new Error('Working with data is not possible in modules');
    }
  }

  //------------Add auto object----------------//
  static addAutoNew(autoObj) {
    try {
      managerAuto.addNewObj({id: uuidv4(), ...autoObj});
    } catch (error) {
      throw new Error('Working with data is not possible in modules');
    }
  }

  //------------Edit auto object----------------//
  static getAutoById(id) {
    try {
      return managerAuto.getObjById(id);
    } catch (error) {
      throw new Error('Working with data is not possible in modules');
    }
  }

  //------------Update auto object----------------//
  static updateAuto(id, obj) {
    try {
      managerAuto.updateObj(id, obj);
    } catch (error) {
      throw new Error('Working with data is not possible in modules');
    }
  }

  //------------Delete auto object----------------//
  static deleteAuto(id) {
    try {
      return managerAuto.deleteObj(id);
    } catch (error) {
      throw new Error('Working with data is not possible in modules');
    }
  }
}

export default Auto;
