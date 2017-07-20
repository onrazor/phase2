import { Router, Request, Response, NextFunction} from 'express';
import SupplierList from '../models/supplierListModel';
//import DateSchema from '../models/dateSchemaModel';

class SupplierListRouter 
{
router: Router;
constructor()
{
	this.router = Router();
	this.routes();
}
/*
// Helper functions: Use this functions if you implement external class for date and
save Date as a type for mongoose schema but it's complex to make user defined types in 
mongoose schema. 
public getFY(basicDate: string) : string
{
  var tempString = basicDate.slice(0,4);
  return tempString;
}

public getFQ(basicDate: string) : string
{
  return "Q1";
}
*/

// Controller to handle HTTP request 
public getSuppliers(req:Request, res: Response): void
{
	SupplierList.find({},function(err,data)
	{ 
	if(err) throw err;
				res.json(data);
	});
}

public AddSupplier(req:Request, res: Response): void
{

    const name: string = req.body.name;
    const price: string = req.body.price;
    const basicDate: string  = req.body.dateObj.basicDate;
    const dateObj: string = req.body.dateObj;
/*
Create functions within this AddSupplier Function to extract the information 
that you need, such as FY, FQ and so on. 
*/

function getFY(basicDate: string) : string
{
  var tempString = basicDate.slice(0,4);
  return tempString;
}

function getFQ(basicDate: string) : string
{ //basicDate's format will be YYYY/MM/DD
  var stringMonth = basicDate.slice(5,7);
  //Convert the month strring to number
  var numMonth = Number(stringMonth);
  var returnFQ = ""; 
  //Find the correct quarter and return the resulting string.
  switch(numMonth)
  { 
   case 7: case 8: case 9: 
   //FQ1
   returnFQ =  "FQ1"; 
   break; 

   case 10: case 11: case 12: 
   //FQ2
   returnFQ =  "FQ2"; 
   break;

   case 1: case 2: case 3: 
   //FQ3
   returnFQ =  "FQ3"; 
   break;

   case 4: case 5: case 6: 
   //FQ4
   returnFQ =  "FQ4"; 
   break;
   default: 
   returnFQ = "ERROR: Extracting proper FQ from ADDSupplier->getFQ fun!";
  }
  return returnFQ;
}

function getCY(basicDate: string) : string
{
  var tempString = basicDate.slice(0,4);
  return tempString;
}

function getPY(basicDate: string) : string
{
  var tempString = basicDate.slice(0,4);
  return tempString;
}

function getCQ(basicDate: string) : string
{ //basicDate's format will be YYYY/MM/DD
  var stringMonth = basicDate.slice(5,7);
  //Convert the month strring to number
  var numMonth = Number(stringMonth);
  var returnCQ = ""; 
  //Find the correct quarter and return the resulting string.
  switch(numMonth)
  { 
   case 7: case 8: case 9: 
   //FQ1
   returnCQ =  "CQ1"; 
   break; 

   case 10: case 11: case 12: 
   //FQ2
   returnCQ =  "CQ2"; 
   break;

   case 1: case 2: case 3: 
   //FQ3
   returnCQ =  "CQ3"; 
   break;

   case 4: case 5: case 6: 
   //FQ4
   returnCQ =  "CQ4"; 
   break;
   default: 
   returnCQ = "ERROR: Extracting proper CQ from ADDSupplier->getCQ fun!";
  }
  return returnCQ;
}

function getPQ(basicDate: string) : string
{ //basicDate's format will be YYYY/MM/DD
  var stringMonth = basicDate.slice(5,7);
  //Convert the month strring to number
  var numMonth = Number(stringMonth);
  var returnPQ = ""; 
  //Find the correct quarter and return the resulting string.
  switch(numMonth)
  { 
   case 7: case 8: case 9: 
   //FQ1
   returnPQ =  "PQ1"; 
   break; 

   case 10: case 11: case 12: 
   //FQ2
   returnPQ =  "PQ2"; 
   break;

   case 1: case 2: case 3: 
   //FQ3
   returnPQ =  "PQ3"; 
   break;

   case 4: case 5: case 6: 
   //FQ4
   returnPQ =  "PQ4"; 
   break;
   default: 
   returnPQ = "ERROR: Extracting proper PQ from ADDSupplier->getPQ fun!";
  }
  return returnPQ;
}

    const FY: string = getFY(basicDate);
    const FQ: string = getFQ(basicDate);
    const CY: string = getCY(basicDate);
    const CQ: string = getCQ(basicDate);
    const PY: string = getPY(basicDate);
    const PQ: string = getPQ(basicDate);
    
  var supplierList = new SupplierList({
      name,
      price,
      dateObj:
      [
      { 
        basicDate,
        FY, 
        FQ,
        CY,
        CQ,
        PY,
        PQ 
      }
      ]
    });

   
    if (!name || !price || !dateObj) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    supplierList.save()
    .then((supplierList) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        supplierList
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

// update supplier by id
public UpdateSupplier(req: Request, res: Response, next: NextFunction): void {
    const supplierId: string = req.params.supplierId;
 

    SupplierList.findByIdAndUpdate (supplierId, {$set: req.body},function(err,data)
    {
      if(err) throw err;
    
      res.json(req.body); 
    });
  }
  
public DeleteSupplier(req:Request, res: Response): void
{
const supplierId: string = req.params.supplierId;
SupplierList.findByIdAndRemove(supplierId,function(err,data)
    {
      if(err) throw err;
    
      res.json(req.body); 
    });

  }

//################################################################################
// Add Dates for a Specific Supplier
//################################################################################
  
public AddDateObj(req: Request, res: Response, next: NextFunction): void {
    const supplierId: string = req.params.supplierId;
   //Create an instance of the model and assign it to the found document and then do 
   //the save and other operations. 

    //First find the specific supplier 
    SupplierList.findById(req.params.supplierId, function(err,foundSupplierObj){
      if (err) throw err;
      SupplierList.schema.methods.dateObj.push(req.body);
      SupplierList.schema.methods.dateObj.save(function(err,supplierObj){
        if(err) throw err;
        console.log('Added a new dateObj');
        res.json(supplierObj);
      });
    });
  }


//Connnect URIs to the specific function
routes()
{
this.router.get('/', this.getSuppliers);
this.router.post('/',this.AddSupplier);
this.router.put('/:supplierId',this.UpdateSupplier);
this.router.delete('/:supplierId',this.DeleteSupplier);
//Dealing with embedded dateObj
this.router.post('/:supplierId/dateObj', this.AddDateObj);
}
}
//export 
const supplierListRoutes = new SupplierListRouter();
supplierListRoutes.routes();

export default supplierListRoutes.router;