// helper function used mainly to turn an object into a string. Useful for
// combining tailwind object classes
export const turnObjectIntoString = (
  className: string | Record<string, string> | undefined
): string | undefined => {
  if (className === undefined) return;
  if (typeof className === "string") return className;
  return Object.values(className).join(" ");
};

// helper function used to order items such as blog posts by date. It needs to
// have a date property for this to work
export const setOrder = <T extends { date: string }>(items: T[]): T[] => {
  const orderedItems = items.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  return orderedItems;
};
