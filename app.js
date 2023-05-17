


const toggleButton = document.getElementById('night-mode-toggle');
const root = document.documentElement;

const input = document.getElementById('item-input');
const form = document.getElementById('form');
const clearBtn = document.getElementById('clear');
const itemList = document.getElementById('item-list');
const todoFooter = document.getElementById('todo-footer');
const itemsLeft = document.getElementById('items-left');
const statusAll = document.getElementById('status-all');
const statusActive = document.getElementById('status-active');
const statusCompleted = document.getElementById('status-complete');
const nightModeIcon = document.querySelector('.todo_header__switch-icon');

toggleButton.addEventListener('click', function(e) {
  root.classList.toggle('night-mode');
  
  
});

// set input cursor

const inputElement = document.getElementById('item-input');
const cursorPosition = 40; // Adjust the value as needed

inputElement.addEventListener('focus', function() {
  if (inputElement.setSelectionRange) {
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
  } else if (inputElement.createTextRange) {
    const range = inputElement.createTextRange();
    range.collapse(true);
    range.moveEnd('character', cursorPosition);
    range.moveStart('character', cursorPosition);
    range.select();
  }
});

// Add Item

function addItem(e) {
    e.preventDefault();
    const newItem = input.value

    if(newItem === '') {
        alert('Please add an item')
     } else {
       addItemToDOM(newItem)
       addItemToStorage(newItem)
      
       const circles = document.querySelectorAll('.circle');
       circles.forEach(circle => {
         circle.addEventListener('click', toggleCircleActive);
       });
      input.value = '';
      checkUI();
     } 
}

// Remove Item

function removeItem(e) {
    if(e.target.classList.contains('fa-xmark')) {
      console.log(e.target)
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
        }
        removeItemFromStorage(e.target.parentElement.parentElement.textContent) 
    }

    checkUI();
}

// Storage

function getItemsFromStorage() {
  let items;
  if(localStorage.getItem('items') === null) {
      items = [];
  } else {
      items = JSON.parse(localStorage.getItem('items'));
  }

  return items;
}


function addItemToStorage(item) {
  const items = getItemsFromStorage();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

function removeItemFromStorage(item) {
  const items = getItemsFromStorage();
  items.forEach(function(i, index){
    if(item === i) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function displayFromLocalStorage() {
  let items = getItemsFromStorage();
  
  items.forEach(function(item) {
    addItemToDOM(item)
  })

  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    circle.addEventListener('click', toggleCircleActive);
  });

  checkUI()
}


function addItemToDOM(item) {
  const li = document.createElement('li');
       li.className = 'item';
   
      
       const circle = document.createElement('div');
       circle.classList = 'circle';
   
       const div = document.createElement('div')
       div.classList.add('i', 'left-element');
       div.appendChild(circle)
       li.appendChild(div)

       const span = document.createElement('span')
       span.appendChild(document.createTextNode(item))
       div.appendChild(span)
   
       const deleteBtn = document.createElement('i');
       deleteBtn.className = 'delete-btn';
       deleteBtn.innerHTML = '<i class="fas fa-xmark"></i>'
       li.appendChild(deleteBtn);
   
       itemList.appendChild(li);
 }




// Check UI

function checkUI() {
  const items = document.querySelectorAll('li');
  if(items.length < 1) {
    todoFooter.style.display = 'none';
    itemList.style.display = 'none';
  } else {
    todoFooter.style.display = 'flex';
    itemList.style.display = 'block';
  }

  const activeItems = document.querySelectorAll('.circle.active');

  const nonActiveItems = items.length - activeItems.length;
  console.log(nonActiveItems)

  itemsLeft.textContent = `${nonActiveItems} items left`;
  
}

// Clear Completed

function clearCompleted(e) {
  const items = document.querySelectorAll('.circle.active')
  items.forEach(item => {
      item.parentElement.parentElement.remove()
      removeItemFromStorage(item.parentElement.parentElement.textContent)

  })


  checkUI()
}

// Show Completed

function showCompleted(e) {
  const activeItems = document.querySelectorAll('.circle.active');
  const items = document.querySelectorAll('.circle');

  if (activeItems.length > 0) {
    items.forEach(item => {
      if (item.classList.contains('active')) {
        item.parentElement.parentElement.style.display = 'flex';
      } else {
        item.parentElement.parentElement.style.display = 'none';
      }
    });
  } else {
    e.preventDefault();
    e.stopPropagation();
  }
}


// Show All 

function showAll() {
  const items = document.querySelectorAll('.circle')
  items.forEach(item => {
      item.parentElement.parentElement.style.display = 'flex'
  })
}

// Show Active 

function showActive() {
  const items = document.querySelectorAll('.circle')
  items.forEach(item => {
      if(item.classList.contains('active')) {
        item.parentElement.parentElement.style.display = 'none'
      } else {
        item.parentElement.parentElement.style.display = 'flex'
      }
  })
}

function toggleCircleActive(e) {

  console.log(e.target)
  if(e.target.classList.contains('circle')) {
      e.target.classList.toggle('active')
      e.target.nextSibling.classList.toggle('show')
  }
}

const circleIcon = document.querySelector('.circle');


// initialize Sortable

function initSortableJS() {
  const itemList = document.getElementById('item-list');

  new Sortable(itemList);
}

// Toggle Icon

function toggleIcon(e) {
  if(e.target.classList.contains('sun')) {
    e.target.classList.remove('sun');
    e.target.classList.add('moon')
  } else {
    e.target.classList.remove('moon');
    e.target.classList.add('sun')
  }
}

function addEventListeners() {
    form.addEventListener('submit', addItem);
    itemList.addEventListener('click', removeItem);
    window.addEventListener('DOMContentLoaded', displayFromLocalStorage);
    clearBtn.addEventListener('click', clearCompleted);
    statusCompleted.addEventListener('click', showCompleted);
    statusAll.addEventListener('click', showAll);
    statusActive.addEventListener('click', showActive);
    nightModeIcon.addEventListener('click', toggleIcon);
  }


  addEventListeners()
  checkUI()
  initSortableJS()

