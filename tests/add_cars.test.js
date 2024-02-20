const { CarsController } = require('../src/controllers/CarsController');

const carsController = new CarsController();
let createdCars = [];

const carData = {
   invalidBrand: {
      carBrandId: 13,
      carModelId: 1,
      mileage: 111,
   },

   invalidModel: {
      carBrandId: 1,
      carModelId: 13,
      mileage: 222,
   },

   noMileage: {
      carBrandId: 1,
      carModelId: 3,
   },

   aboveMaximumMileage: {
      carBrandId: 1,
      carModelId: 3,
      mileage: 9999999,
   },

   negativeMileage: {
      carBrandId: 1,
      carModelId: 3,
      mileage: -13,
   },
};

describe('Create cars and validate data', () => {
   beforeAll(async () => {
      await carsController.login();
   });

   test('create all car brands with all available models', async () => {
      const carsModels = await carsController.getCarsModels();
      const allBrandsModels = carsModels.data.data.map(({ id, carBrandId }) => ({
         carBrandId: carBrandId,
         carModelId: id,
         mileage: 13,
      }));

      const createCarsRequests = allBrandsModels.map(async (cars) => {
         const response = await carsController.createCar(cars);
         expect(response.status).toBe(201);
         expect(response.data.data).toMatchObject(cars);
         createdCars.push(response.data.data.id);
      });

      await Promise.all(createCarsRequests);
   });

   test('delete all created cars', async () => {
      const deleteCarRequests = createdCars.map(async (cars) => {
         const response = await carsController.deleteCar(cars);
         expect(response.status).toBe(200);
      });

      await Promise.all(deleteCarRequests);
   });

   test('create car with invalid brand', async () => {
      const invalidBrandCar = carData.invalidBrand;
      const response = await carsController.createCar(invalidBrandCar);
      expect(response.status).toBe(404);
   });

   test('create car with invalid model', async () => {
      const unvalidModelCar = carData.invalidModel;
      const response = await carsController.createCar(unvalidModelCar);
      expect(response.status).toBe(404);
   });

   test('create car without mileage', async () => {
      const noMileageCar = carData.noMileage;
      const response = await carsController.createCar(noMileageCar);
      expect(response.status).toBe(400);
   });

   test('create car with above maximum mileage number', async () => {
      const aboveMaximumMileageCar = carData.aboveMaximumMileage;
      const response = await carsController.createCar(aboveMaximumMileageCar);
      expect(response.status).toBe(400);
   });

   test('create car with negative mileage number', async () => {
      const negativeMileageCar = carData.negativeMileage;
      const response = await carsController.createCar(negativeMileageCar);
      expect(response.status).toBe(400);
   });
});

