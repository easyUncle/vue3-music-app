import storage from 'good-storage';

export function save(item, key, compare) {
  const storageArr = storage.get(key, []);
  console.log(storageArr);
  const index = storageArr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    storageArr.splice(index, 1);
  }
  storageArr.unshift(item);
  storage.set(key, storageArr);
  return storageArr;
}

export function remove(key, compare) {
  const storageArr = storage.get(key, []);
  const index = storageArr.findIndex(compare);
  if (index > -1) {
    storageArr.splice(index, 1);
  }
  storage.set(key, storageArr);
  return storageArr;
}

export function clear(key) {
  storage.remove(key);
  return [];
}

export function saveAll(items, key) {
  storage.set(key, items);
}

export function load(key) {
  return storage.get(key, []);
}
