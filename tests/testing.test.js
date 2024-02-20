const { CarsController } = require('../src/controllers/CarsController');

let createdCarId;
const carsController = new CarsController();
describe.skip('Create cars and validate data', () => {
    beforeAll(async () => {
        await carsController.login();
    });

    test('create car', async () => {
        const createCarResp = await carsController.createCar({
            carBrandId: 1,
            carModelId: 1,
            mileage: 122,
        });

        createdCarId = createCarResp.data.data.id;
        expect(createCarResp.status).toBe(201);
    });

    test('delete created car', async () => {
        const deleteCarResp = await carsController.deleteCar(createdCarId);
        expect(deleteCarResp.status).toBe(200);
    });
});

