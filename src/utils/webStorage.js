
export const webStorageGetItem = (key, defaultValue = null) => {
  return localStorage.getItem(key) || defaultValue;
};

export const webStorageSetItem = (key,value) =>{
    localStorage.setItem(key,value)
}

export const webStorageSetObjectItem = (key,value) =>{
    localStorage.setItem(key,JSON.stringify(value))
}
