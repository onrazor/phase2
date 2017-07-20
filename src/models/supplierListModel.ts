import { Schema, model } from 'mongoose';
//import  DateSchema from "./dateSchemaModel";

let DateSchemaModel : Schema = new Schema({
	basicDate: String,
	FY: String,
	FQ: String,
	CY: String,
	CQ: String, 
	PY: String,
	PQ: String
})

let SupplierListSchema: Schema = new Schema({
name: 
{
type: String, 
required: true
},
price: 
{
	type: Number,
	required: true
},/*
basicDate:
{
	type: String,
	required: true
},*/
dateObj: [DateSchemaModel]		 
});

export default model('SupplierList', SupplierListSchema);
