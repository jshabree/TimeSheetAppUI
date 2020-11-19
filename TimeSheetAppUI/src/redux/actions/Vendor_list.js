import * as Types from "../actions/types";

export const addVendor = (user) => ({
  type: Types.VENDOR_SAVE_DATABASE,
  user,
});

export const updateVendor = (vendorDetails) => {
  return {
    type: Types.UPDATE_VENDOR,
    vendorDetails,
  };
};

export const listVendorDetails = (listVendor) => {
  return {
    type: Types.LIST_VENDOR_DETAILS,
    listVendor,
  };
};

export const deleteVendor = (_id) => {
  console.log("Delete Id " + _id);
  return {
    type: Types.DELETE_VENDOR,
    _id,
  };
};

export const deleteVendorSucess = (_id) => {
  return {
    type: Types.DELETE_VENDOR_SUCESS,
    _id,
  };
};
