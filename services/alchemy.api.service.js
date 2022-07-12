import {
    Network,
    initializeAlchemy,
    getNftsForCollection,
    getOwnersForCollection
  } from "@alch/alchemy-sdk";


export default class AlchemyApi {
    static settings = {
        apiKey: process.env.ALCHEMY_KEI, 
        network: Network.MATIC_MUMBAI, 
        maxRetries: 10,
    };

    static alchemy = initializeAlchemy(this.settings);

    static async getNftsForCollection(collection) {
        await getNftsForCollection(
            alchemy,
            collection
          );
    } 

    static async getOwnersForCollection(collection) {
        await getOwnersForCollection(
            alchemy,
            collection
          );
    } 
      
}