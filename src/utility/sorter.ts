export const sort = (arr: any[], dir: 'asc' | 'desc', field: string) => {
  if (dir === 'asc') {
    return arr.sort((a: any, b: any) => {
      let valA = a[field];
      let valB = b[field];
      if (field === 'date') {
        valA = new Date(a[field]);
        valB = new Date(b[field]);
      }
      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    });
  }
  return arr.sort((a: any, b: any) => {
    let valA = a[field];
    let valB = b[field];
    if (field === 'date') {
      valA = new Date(a[field]);
      valB = new Date(b[field]);
    }
    if (valA > valB) {
      return -1;
    }
    if (valA < valB) {
      return 1;
    }
    return 0;
  });
};
