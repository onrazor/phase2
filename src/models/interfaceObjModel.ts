import { Schema, model } from 'mongoose';

// create a schema
let interfaceObjSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
    },
	 type: {
		type: String	
		},			
	named: {
		type: Boolean,
		required: true
		}, 
	supplierName: {
    	type: String,
    	required: true,
   	    unique: true
    }, 
	price: {
		type: Number,
	    require:true,
		unique: false
		},
	time:	{
		type: Date
		},
	programName: {
    	type: String,
  		required: true,
   		unique: true
		},
	commodityName: {
    	type: String,
    	required: true,
    	unique: true
    }
},
	{
    timestamps: true
});

// make this available to our Node applications
export default model('InterfaceObj', interfaceObjSchema);