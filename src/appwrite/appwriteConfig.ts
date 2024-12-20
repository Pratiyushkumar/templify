import { Client, Account } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export default client;
