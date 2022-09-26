import addToLocalStorage from './modules/localStorage.js';
import time from './modules/dateTime.js';

const bookInput = document.querySelector('.book-input');
const authorInput = document.querySelector('.author-input');
const submit = document.querySelector('.add');
const booksDiv = document.querySelector('.books');

let arrayOfBooks = [];

if (localStorage.getItem('books')) {
  arrayOfBooks = JSON.parse(localStorage.getItem('books'));
}

const addElementsToPage = ((arrayOfBooks) => {
  booksDiv.innerHTML = '';

  arrayOfBooks.forEach((task) => {
    const contactElement = ' By : ';
    const div = document.createElement('div');
    div.className = 'task';

    div.setAttribute('data-id', task.id);
    div.appendChild(
      document.createTextNode(task.title + contactElement + task.author),
    );

    const span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('Delet'));

    div.appendChild(span);

    booksDiv.appendChild(div);
  });
});

const getFromLocalStorage = () => {
  const data = window.localStorage.getItem('books');
  if (data) {
    const books = JSON.parse(data);
    addElementsToPage(books);
  }
};

// Trigger Get Data From Local Storage Function
getFromLocalStorage();

class AddingBooks {
  static addTaskToArray(taskText, authorText) {
    const task = {
      id: Date.now(),
      title: taskText,
      author: authorText,
    };

    arrayOfBooks.push(task);

    addElementsToPage(arrayOfBooks);

    addToLocalStorage(arrayOfBooks);
  }

  static deletTaskWith = (taskId) => {
    arrayOfBooks = arrayOfBooks.filter((task) => (task.id !== taskId));
    addToLocalStorage(arrayOfBooks);
  };
}

// ################ Add book ################
submit.onclick = () => {
  if ((bookInput.value && authorInput.value) !== '') {
    AddingBooks.addTaskToArray(bookInput.value, authorInput.value);
    bookInput.value = '';
    authorInput.value = '';
    bookInput.focus();
  }
};

// ################ Click to delet Element ################

booksDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    e.target.parentElement.remove();

    AddingBooks.deletTaskWith(JSON.parse(e.target.parentElement.getAttribute('data-id')));
  }
});

// ################ Website Navigation ###################3

const navList = document.querySelector('#nav-list');
const navAddNew = document.querySelector('#nav-add-new');
const navContact = document.querySelector('#nav-contact');

const bookListSection = document.querySelector('.books-list');
const addNewSection = document.querySelector('.add-new-book');
const contactSection = document.querySelector('.contact-info');
const bookListDivContainer = document.querySelector('.books-list-main-div');

navList.addEventListener('click', () => {
  bookListSection.classList.add('display-section');
  bookListDivContainer.classList.add('display-section');
  addNewSection.classList.remove('display-section');
  contactSection.classList.remove('display-section');
  console.log('test');
});

navAddNew.addEventListener('click', () => {
  bookListSection.classList.remove('display-section');
  bookListDivContainer.classList.remove('display-section');
  addNewSection.classList.add('display-section');
  contactSection.classList.remove('display-section');
});

navContact.addEventListener('click', () => {
  bookListSection.classList.remove('display-section');
  bookListDivContainer.classList.remove('display-section');
  addNewSection.classList.remove('display-section');
  contactSection.classList.add('display-section');
});

// ################ Current Time ################

time();

// ################ Mobile navbar ################

const hamburgerMenu = document.querySelector('.hamburger');
const navBar = document.querySelector('nav');
const navLinks = document.querySelectorAll('#nav-links li');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navBar.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navBar.classList.remove('active');
  });
});
