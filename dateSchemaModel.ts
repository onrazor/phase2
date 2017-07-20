import { Schema, model } from 'mongoose';

let DateSchemaModel : Schema = new Schema({
	basicDate: String,
	FY: String,
	FQ: String
	/*
	CY: String,
	CQ: String, 
	PY: String,
	PQ: String
	*/
})

export default model('DateSchema', DateSchemaModel);