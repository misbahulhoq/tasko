export const prepareQuery = (queryObj: {
  [key: string]: string | number | null;
}) => {
  let query = "";
  for (const key in queryObj) {
    if (queryObj[key]) {
      if (query.length) query += `&${key}=${queryObj[key]}`;
      else query += `?${key}=${queryObj[key]}`;
    }
  }
  return query;
};
