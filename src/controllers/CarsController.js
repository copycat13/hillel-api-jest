const { BaseController } = require('./BaseController');

class CarsController extends BaseController {
   constructor() {
      super();
      this.API_CARS = '/cars';
      this.API_CARS_ID = '/cars/{id}';
      this.API_CARS_BRANDS_ID = '/cars/brands/{id}';
      this.API_CARS_MODELS = '/cars/models';
   }

   async createCar(car) {
      return this.post(this.API_CARS, car);
   }

   async getCarsBrandById(id) {
      return this.get(this.API_CARS_BRANDS_ID.replace('{id}', id));
   }

   async getCarsModels() {
      return this.get(this.API_CARS_MODELS);
   }

   async deleteCar(id) {
      return this.delete(this.API_CARS_ID.replace('{id}', id));
   }
}

module.exports.CarsController = CarsController;

