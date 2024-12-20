import { Client, Account } from 'appwrite';

export const PROJECT_ID = '676436110035c2350ab4';
export const API_ENDPOINT = 'https://cloud.appwrite.io/v1';

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export default client;
