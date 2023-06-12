import TrustedBrandModel, { TrustedBrand, TrustedBrandInput } from "../models/TrustedBrand.js"

export const fetchAllBrandsFromDb = async (): Promise<TrustedBrand[]> =>  {
    return await TrustedBrandModel.find({});
}

export const fetchSingleBrandFromDb = async (id: string): Promise<TrustedBrand | null> =>  {
    return await TrustedBrandModel.findById(id);
}

export const createNewBrand = async (brandInfo: TrustedBrandInput ): Promise<boolean> => {
    return await TrustedBrandModel.create(brandInfo) ? true : false;
}