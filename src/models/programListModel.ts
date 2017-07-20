import { Schema, model } from 'mongoose';

let ProgramListSchema: Schema = new Schema({
name: 
{
type: String, 
required: true,
unique: true
}
});
export default model('ProgramList', ProgramListSchema);
