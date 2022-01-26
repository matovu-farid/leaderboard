export default class LocalStorageManager {
    save=(object) => {
      const stringObject = JSON.stringify(object);
      window.localStorage.setItem('object', stringObject);
    }

    retrieve=() => {
      const serializedObject = window.localStorage.getItem('object');
      const gameId = JSON.parse(serializedObject) || {};
      return gameId;
    }
}
export const storage = new LocalStorageManager();