import * as Types from "./types";

export const addClient = (clientDetails) => {
    return {
        type: Types.CREATE_CLIENT,
        clientDetails,
    };
};

export const updateClient = (clientDetails) => {
    return {
        type: Types.UPDATE_CLIENT,
        clientDetails,
    };
};

export const listClientDetails = () => {
    return {
        type: Types.LIST_CLIENT_DETAILS
    };
};

export const deleteClient = (_id) => {
    console.log("Delete Id " + _id);
    return {
        type: Types.DELETE_CLIENT,
        _id,
    };
};

export const deleteClientSuccess = (_id) => {
    return {
        type: Types.DELETE_CLIENT_SUCCESS,
        _id,
    };
};

// export const editClient = (_id) => {
//     return {
//         type: Types.EDIT_CLIENT_GET_DETAILS,
//         _id
//     }
// }
