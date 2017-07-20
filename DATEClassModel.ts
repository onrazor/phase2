
export class DateClass{

//Member variables 
basicDate: String;
FY: String;
FQ: String;

//constructor
constructor(dateFromSupplier: string)
{
this.basicDate = dateFromSupplier.toString();
}

//Methods for FY
get getFY(): String
{
	return this.basicDate.slice(6,9);
}
set setFY(FY: String)
{
this.FY = FY;
}

//Methods for FQ
get getFQ(): String
{
	return this.basicDate.slice(6,9);
}
set setFQ(FQ: String)
{
this.FQ = FQ;
}



} //END: class Declaration 

