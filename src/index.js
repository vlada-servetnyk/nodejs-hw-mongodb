import { setupServer } from './server.js';
import {initMongoConnection} from './initMongoConnection.js'

await initMongoConnection();
setupServer();