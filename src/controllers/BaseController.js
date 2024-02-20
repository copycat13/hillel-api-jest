const axios = require('axios');

class BaseController {
   constructor() {
      this.options = {
         baseURL: process.env.BASE_URL,
         validateStatus: (status) => {
            return true;
         },
      };
      this.client = axios.create(this.options);
   }

   async login() {
      const authResp = await axios.post(`${process.env.BASE_URL}/auth/signin`, {
         email: process.env.EMAIL,
         password: process.env.PASSWORD,
         remember: false,
      });
      const sid = authResp.headers['set-cookie'][0].split(';')[0];
      this.options.headers = { Cookie: sid };
   }

   get(url) {
      return this.client.get(url, this.options);
   }

   post(url, data) {
      return this.client.post(url, data, this.options);
   }

   put(url, data) {
      return this.client.put(url, data, this.options);
   }

   delete(url) {
      return this.client.delete(url, this.options);
   }
}

module.exports.BaseController = BaseController;

