import { Schema, InferSchemaType, model, Document} from 'mongoose';

const TrustedBrandSchema = new Schema({
    name:{type: Schema.Types.String, required: true, unique: true },
    file:{
        id: {type: Schema.Types.String},
        contentType: {type: Schema.Types.String }
    }
},
{
    timestamps: true
});

export type TrustedBrand = InferSchemaType<typeof TrustedBrandSchema & Document>;

export interface TrustedBrandInput {
    name: string
    file:{
        id: string
        contentType: string
    }
}

export default model<TrustedBrand>('TrustedBrand',TrustedBrandSchema);
