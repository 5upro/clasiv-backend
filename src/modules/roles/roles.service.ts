import * as roleRepository from "@/modules/roles/roles.repository";

export const getRoles = async () => {
	const { data: roles, error: rolesErr } = await roleRepository.getRoles();
    if(rolesErr){
        throw new Error(rolesErr.message);
    }
    return roles;
}
