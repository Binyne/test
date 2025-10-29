import Sex from "../models/sex.js";

export const listSexs = () => Sex.find().lean();
export const getSexById = (id) => Sex.findById(id).lean();
export const createSex = (payload) => Sex.create(payload);
export const deleteSex = (id) => Sex.findByIdAndDelete(id);