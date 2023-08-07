export const excludeSensitiveFields = (
  obj: object | null,
  excludeFields: string[]
): object | null => {
  if (!obj || !excludeFields || excludeFields.length === 0) {
    return null;
  }

  // Create a new object to hold the filtered properties
  const filteredObj: any = { ...obj };

  // Remove the specified fields from the object
  for (const field of excludeFields) {
    delete filteredObj[field];
  }

  return filteredObj;
};
