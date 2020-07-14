export const createCategoriesList = (allMenuObjects) => {
  // receive array of menu objects
  const categories = allMenuObjects.map((item) => item.category);

  //sort alphabetically
  categories.sort((prev, next) => {
    if (prev < next) {
      return -1;
    } else if (prev > next) {
      return 1;
    } else {
      return 0;
    }
  });

  //remove duplicates
  const map = {};
  for (let i = 0; i < categories.length; i++) {
    if (map[categories[i].trim().toLowerCase()]) {
      continue;
    } else {
      map[categories[i].trim().toLowerCase()] = i;
    }
  }

  const noDuplicates = Object.keys(map);

  return noDuplicates.map((item) => item[0].toUpperCase() + item.substr(1));
};

export const separateCategories = (menuItems) => {
  // will receive array of objects as param
  //get unique categories
  const categories = createCategoriesList(menuItems);
  const result = [];

  for (let i = 0; i < categories.length; i++) {
    let itemsInCategory = menuItems.filter((item) => {
      return item.category.trim().toLowerCase() === categories[i].toLowerCase();
    });
    result.push({
      category: categories[i],
      items: itemsInCategory,
    });
  }
  return result;
};
