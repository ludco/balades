/**
 * Clear Storage on state change for redux-persist
 * @returns next action
 */
export function clearStorage() {
  return function (next) {
    return function (action) {
      localStorage.clear();

      return next(action);
    };
  };
}
