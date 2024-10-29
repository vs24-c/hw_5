import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import settings from '../settings.json' assert {type: 'json'};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ManagerAuto {
  constructor(filePath, dirname) {
    this.filePath = filePath;
    this.dirname = dirname;
  }

  //-------------------Writing object---------------//
  async loadDataAuto() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.saveData([]);
        return [];
      } else {
        throw new Error(`Error reading data: ${error.message}`);
      }
    }
  }

  //-------------------Save object---------------//
  async saveObj(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error save data: ${error.message}`);
    }
  }

  //-------------------Add object---------------//
  async addNewObj(newObj) {
    try {
      const data = await this.loadDataAuto();
      data.push(newObj);
      await this.saveObj(data);
    } catch (error) {
      throw new Error('Invalid object');
    }
  }

  //-------------------Edit object by id---------------//
  async getObjById(id) {
    try {
      const data = await this.loadDataAuto();
      const auto = data.find((obj) => obj.id == id);
      if (!auto) {
        throw new Error(`Auto with id ${id} not found`);
      }
      return auto;
    } catch (error) {
      throw new Error('Error: Unable to find object by ID');
    }
  }

  //-------------------Update object by id---------------//
  async updateObj(id, updateObj) {
    try {
      if (!updateObj) {
        throw new Error('Object not provided for update');
      } else if (!id) {
        throw new Error('Id not provided for update');
      }
      const data = await this.loadDataAuto();
      const index = data.findIndex((obj) => obj.id == id);
      if (index === -1) {
        throw new Error(`Auto with id ${id} not found`);
      }
      data[index] = {...data[index], ...updateObj};
      await this.saveObj(data);
    } catch (error) {
      throw new Error('Error: Unable to update object by ID');
    }
  }

  //-------------------Delete object by id---------------//

  async deleteFile(fileName) {
    const filePath = path.join(this.dirname, '../uploads', fileName);
    try {
      await fs.unlink(filePath);
      console.log('Файл успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
    }
  }

  async deleteObj(id) {
    try {
      if (!id) {
        throw new Error('Id not provided for delete');
      }
      const data = await this.loadDataAuto();
      const newDat = data.filter((ob) => ob.id != id);
      const delObj = data.find((el) => el.id == id);
      if (delObj && delObj.imgSrc) {
        await this.deleteFile(delObj.imgSrc);
      }
      if (newDat.length === data.length) {
        throw new Error(`Auto with id ${id} not found`);
      }
      await this.saveObj(newDat);
    } catch (error) {
      throw new Error('Error: Object not found by ID');
    }
  }
}

export default new ManagerAuto(settings.filePath, __dirname);
