import { Schema, model } from 'mongoose';

let CommodityListSchema: Schema = new Schema({
name: 
{
type: String, 
required: true,
unique: true
}
});
export default model('CommodityList', CommodityListSchema);
