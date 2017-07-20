import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as path from 'path';


(mongoose as any).Promise = global.Promise;
// custom modules
import SupplierListRouter from './routers/supplierListRouter';
import CommodityListRouter from './routers/commodityListRouter'; 
import ProgramListRouter from './routers/programListRouter'; 
import InterfaceObjRouter from './routers/interfaceObjRouter'; 
// Server class
class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  // application config
  public config() {
 
    mongoose.connect('mongodb://localhost/newTestDb');

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
   
  }

  // application routes
  public routes(): void {

    let router: express.Router;
    router = express.Router();
    this.app.use('/', router);
    this.app.use('/supplierList', SupplierListRouter );
    this.app.use('/commodityList',CommodityListRouter);
    this.app.use('/programList',ProgramListRouter); 
    this.app.use('/interfaceObj',InterfaceObjRouter);
  }
}

// export
export default new Server().app;
