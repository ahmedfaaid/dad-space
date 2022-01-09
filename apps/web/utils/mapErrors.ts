export const mapErrors = errors => {
  const map = {};
  errors.forEach(({ path, message }) => {
    map[path] = message;
  });

  return map;
};
