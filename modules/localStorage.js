/* LocalStorage Function */

const addToLocalStorage = (arrayOfBooks) => {
  window.localStorage.setItem('books', JSON.stringify(arrayOfBooks));
};

export default addToLocalStorage;
