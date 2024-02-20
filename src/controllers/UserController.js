const { BaseController } = require('./BaseController');

class UsersController extends BaseController {
   constructor() {
      super();
      this.API_USERS_PROFILE = '/users/profile';
      this.API_USERS_CURRENT = '/users/current';
   }

   async getUserProfile() {
      return this.get(this.API_USERS_PROFILE);
   }

   async getCurrentUserData() {
      return this.get(this.API_USERS_CURRENT);
   }

   async updateUserProfile(profile) {
      return this.put(this.API_USERS_PROFILE, profile);
   }
}

module.exports.UsersController = UsersController;

