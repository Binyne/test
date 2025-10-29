import Role from "../models/role.js";

export const listRoles = () => Role.find().lean();
export const getRoleById = (id) => Role.findById(id).lean();
