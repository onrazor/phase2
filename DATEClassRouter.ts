import { Router, Request, Response, NextFunction} from 'express';
//import DATEClass from '../models/DATEClassModel';

class DateClass
{
router: Router;
constructor(date: Date)
{
	this.router = Router();
	this.routes();
}
//GET CALL
public getProgram(req:Request, res: Response): void
{
	ProgramList.find({},function(err,data)
	{ 
	if(err) throw err;
				res.json(data);
	});
}

//POST CALL
public AddProgram(req:Request, res: Response): void
{
    const name: string = req.body.name;  
    
    if (!name) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

		const programList = new ProgramList({
      name,
    });

	 programList.save()
		.then((programList) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
				programList
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
	public UpdateProgram(req: Request, res: Response, next: NextFunction): void 
	{
		const programId: string = req.params.programId;
		
		ProgramList.findByIdAndUpdate(programId, {$set: req.body},function(err,data)
    {
      if(err) throw err;
      res.send('Updated the name of the specified program permanently'); 
    });
	}
	
 //DELETE CALL
	public DeleteProgram(req:Request, res: Response): void
	{
		const programId: string = req.params.programId;
		ProgramList.findByIdAndRemove(programId,function(err,data)
			{
			if(err) throw err;
		  res.end('program deleted from the database peremantely');		
		});		
	}

//Connnect URIs to the specific function
routes()
{
this.router.get('/', this.getProgram);
this.router.post('/', this.AddProgram);
this.router.put('/:programId', this.UpdateProgram);
this.router.delete('/:programId', this.DeleteProgram);
}
}
//export 
const ProgramListRoutes = new ProgramListRouter();
ProgramListRoutes.routes();

export default ProgramListRoutes.router;