var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
const keyNewTaskList = "keyNewTaskList";

//добавление новой задачи прослушка события
form.addEventListener("submit", addItem);

//удаление элемента - прослушка клика 
itemList.addEventListener("click", removeItem);

// фильтрация списка дел - прослушка ввода 
filter.addEventListener("keyup", filterItems);

//добавление новой задачи функция
function addItem(e) {
  //отменяем отправку формы
  e.preventDefault();

  //находим инпут с текстом для новой задачи
  var newItemInput = document.getElementById("newItemText");

  //получаем текст из инпута
  var newItemText = newItemInput.value;

  renderNewTask(newItemText);

  saveNewTaskToLocalStorage(newItemText, keyNewTaskList);

  //очистим поле добавления новой задачи
  newItemInput.value = "";

}

//функция создания нового элемента
function renderNewTask(newItemText) {

  // создаем элемент для новой задачи
  var newElement = document.createElement("li");
  newElement.className = "list-group-item";

  //добавить текст в новый элемент 
  var newTextNode = document.createTextNode(newItemText);
  newElement.appendChild(newTextNode);

  //создаем кнопку
  var deleteBtn = document.createElement("button");

  //добавляем текст удалить в кнопку 
  deleteBtn.appendChild(document.createTextNode("Удалить"));

  //добавялем css class
  deleteBtn.className = "btn btn-light btn-sm float-right";

  //добавляем дата атрибут
  deleteBtn.dataset.action = "delete";

  deleteBtn.dataset.value = newItemText;

  //помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);

  //добавляем новую задачу в список со всеми задачами
  itemList.prepend(newElement);
}

function getListFromLocalStorage() {
  var list = JSON.parse(localStorage.getItem(keyNewTaskList));
  if (null === list) {
    return [];
  } else {
    return list;
  }
}

function removeItemFromLocalStorage(removeElement) {
  var list = getListFromLocalStorage();
  var newList = [];
  list.forEach(function (item) {
    if (item !== removeElement) {
      newList.push(item)
    }
  })
  setListToLocalStorage(newList)
}

function setListToLocalStorage(newList) {
  localStorage.setItem(keyNewTaskList, JSON.stringify(newList));
}
//функция сохранения в localStorage
function saveNewTaskToLocalStorage(newItemText, keyNewTaskList) {
  var list = getListFromLocalStorage();
  list.push(newItemText);
  setListToLocalStorage(list);
}


//удаление элемента - функция 
function removeItem(e) {

  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("удалить задачу?")) {
      e.target.parentNode.remove();
    }
  }

  removeItemFromLocalStorage(e.target.dataset.value);
}

// фильтрация списка дел - функция
function filterItems(e) {

  // получаем фразу для поиска и переводим ее в нижний регистр
  var searchedText = e.target.value.toLowerCase();

  //получаем список всех задач
  var items = itemList.querySelectorAll("li");

  //перебираем циклом все айденные теги li с задачами
  items.forEach(function (item) {

    //получаем текст задачи из списка и переводим его в нижний регистр 
    var itemText = item.firstChild.textContent.toLowerCase();

    //проверяем вхождение искомой подстроки в текст задачи
    if (itemText.indexOf(searchedText) != -1) {

      //если вохождение есть - показываем элемент с задачей
      item.style.display = "block";

    } else {
      // если вохождения нет - скрываем элемент с задачей 
      item.style.display = "none";
    }
  })
}

// переносим данные из html в localStorage

(function () {
  let list = JSON.parse(localStorage.getItem(keyNewTaskList));
  if (list !== null) {
    list.forEach(element => renderNewTask(element));
  }

})(keyNewTaskList)




