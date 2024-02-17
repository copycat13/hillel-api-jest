const axios = require('axios');

test.skip('should fetch brands', async () => {
  const response = await axios.get('https://qauto.forstudy.space/api/cars/brands');
  expect(response.data.data.length).toBe(5);
});

test('brand ids in brand request are the same as in models request', async () => {
  const brandReponse = await axios.request({
    method: 'get',
    url: 'https://qauto.forstudy.space/api/cars/brands',
  });
  const brandIds = brandReponse.data.data.map((brand) => brand.id);
  const carsResponse = await axios.get('https://qauto.forstudy.space/api/cars/models');

  const carsBrandIds = [...new Set(carsResponse.data.data.map((car) => car.carBrandId))];

  expect(brandIds).toStrictEqual(carsBrandIds);
});
