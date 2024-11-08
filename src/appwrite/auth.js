import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account;
    //constructor
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    //methods
    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), name, email, password)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }
 
    async getCurrentUser() {
        try {
          const user = await account.get();
          return user;
        } catch (error) {
          if (error.code === 401) {
            console.error("User is not authorized. Please log in again.");
            // Handle reauthentication here if necessary
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    

    async logout(){
        try {
        return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService()
export default authService