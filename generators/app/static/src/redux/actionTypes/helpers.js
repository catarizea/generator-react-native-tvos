export const createAsyncActionTypes = ({ name, type }) => {
  const prefix = `${name ? `${name}/` : ''}${type.toUpperCase()}`;

  return [
    `${prefix}_REQUEST`,
    `${prefix}_SUCCESS`,
    `${prefix}_FAILURE`,
    `${prefix}_RESET`,
  ];
};
