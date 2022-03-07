const container = document.getElementById("todoContainer");
const list = document.getElementById("allTodoList");

const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const drawTodos = async () => {
  const todos = await fetchData("https://jsonplaceholder.typicode.com/todos");

  // Create arrays for each user, all in one object. 
  // Restructure data to organize todos by user ID.
  const todosByUser = todos.reduce((acc, todo) => {
    const { userId, ...rest } = todo;
    return { ...acc, [userId]: [...(acc[userId] || []), rest]};
  }, {});

  // Loop object to get each user's array and draw it.
  for (const userID in todosByUser) {
    const userContainer = document.createElement("article");
    const userHeader = document.createElement("h2");
    userHeader.innerText = `User ID ${userID}`;
    userContainer.appendChild(userHeader);
    // Get todos array for one user
    const singleUserTodoList = todosByUser[userID];
    
    singleUserTodoList.forEach(todo => { 
      addCheckbox(todo, userContainer);
      container.appendChild(userContainer);
      addStateToCheckbox(todo);
    });
  }
}

const addCheckbox = (todo, container) => {
  const li = document.createElement("li");
  li.classList.add("todo");

  li.innerHTML = `
  <input type="checkbox" id="${todo.id}" name="${todo.title}" >
  <label for="${todo.id}">${todo.title}<label>
  `
  container.appendChild(li); 
}

const addStateToCheckbox = (todo) => {
  // If todo is completed mark it as checked
  if(todo.completed) {
    const checkbox = document.querySelector(`input[type=checkbox][id="${todo.id}"]`);
    checkbox.checked = true;
  }
}

drawTodos();