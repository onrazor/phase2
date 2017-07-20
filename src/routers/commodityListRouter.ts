import { Router, Request, Response, NextFunction} from 'express';
import CommodityList from '../models/commodityListModel';

class CommodityListRouter
{
router: Router;
constructor()
{
	this.router = Router();
	this.routes();
}
//GET CALL
public getCommodity(req:Request, res: Response): void
{
	CommodityList.find({},function(err,data)
	{ 
	if(err) throw err;
				res.json(data);
	});
}

//POST CALL
public AddCommodity(req:Request, res: Response): void
{
    const name: string = req.body.name;  
    
    if (!name) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const commodityList = new CommodityList({
      name,
    });

   commodityList.save()
    .then((commodityList) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        commodityList
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


// update Commodity by id
	public UpdateCommodity(req: Request, res: Response, next: NextFunction): void 
	{
		const commodityId: string = req.params.commodityId;
		
    CommodityList.findByIdAndUpdate(commodityId, {$set: req.body},function(err,data)
    {
      if(err) throw err;
    
      res.json(req.body); 
    });
  }

	public DeleteCommodity(req:Request, res: Response): void
	{
		const commodityId: string = req.params.commodityId;
		CommodityList.findByIdAndRemove(commodityId,function(err,data)
			{
			if(err) throw err;
		  res.end('Commodity deleted from the database peremantely');		
		});		
	}

//Connnect URIs to the specific function
routes()
{
this.router.get('/', this.getCommodity);
this.router.post('/', this.AddCommodity);
this.router.put('/:commodityId', this.UpdateCommodity);
this.router.delete('/:commodityId', this.DeleteCommodity);
}
}
//export 
const commodityListRoutes = new CommodityListRouter();
commodityListRoutes.routes();

export default commodityListRoutes.router;