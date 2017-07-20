import { Router, Request, Response, NextFunction} from 'express';
import InterfaceObj from '../models/InterfaceObjModel';

class InterfaceObjRouter
{
router: Router;
constructor()
{
	this.router = Router();
	this.routes();
}
public getInterfaceObj(req:Request, res: Response): void
{ 
	InterfaceObj.find({},function(err,data)
	{ 
	if(err) throw err;
				res.json(data);
	});
}


public AddInterfaceObj(req:Request, res: Response): void
{
    //Retrice the information to insert in the document
    const name: string = req.body.name;
    const type: string = req.body.type;
		const named: boolean = req.body.named;
		const supplierName: string = req.body.supplierName;
		const price: number = req.body.price;
		const time: Date = req.body.time;
		const programName: string = req.body.programName;
		const commodityName: string = req.body.commodityName;
		
    if (!name || !price || !type || !named || !supplierName || !programName || !commodityName || !time) {
      res.status(422).json({ message: 'All Fields Required.' });
    }
	 
		//Create a new Object of type InterfaceObj to enter the document
    const interfaceObj = new InterfaceObj({
      name,
			type,
			named,
			supplierName,
			price,
			time,
			programName,
			commodityName
		});

		//Insert the new document into the collection
		interfaceObj.save()
    .then((interfaceObj) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        interfaceObj
      });
    })
    .catch((error) => {
			let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })
}

//PUT CALL 
  public UpdateInterfaceObj(req: Request, res: Response, next: NextFunction): void {
  const interfaceObjId: string = req.params.interfaceObjId;
 
  InterfaceObj.findByIdAndUpdate(interfaceObjId, {$set: req.body},function(err,data)
    {
      if(err) throw err;
      res.json(req.body); 
    });
	}
	
//DELETE CALL	
public DeleteInterfaceObj(req:Request, res: Response): void
{
const interfaceObjId: string = req.params.interfaceObjId;

InterfaceObj.findByIdAndRemove(interfaceObjId,function(err,data)
    {
      if(err) throw err;
      res.end('The interfacObj you specified has been removed permanently from the database.'); 
    });
  }

//Connnect URIs to the specific function
routes()
{
this.router.get('/', this.getInterfaceObj);
this.router.post('/',this.AddInterfaceObj);
this.router.put('/:interfaceObjId',this.UpdateInterfaceObj);
this.router.delete('/:interfaceObjId',this.DeleteInterfaceObj);
}
}
//export 
const InterfaceObjRoutes = new InterfaceObjRouter();
InterfaceObjRoutes.routes();

export default InterfaceObjRoutes.router;