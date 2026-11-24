const KEY = "todos";
const list = document.getElementById("list");
const form = document.getElementById("add");
const input = document.getElementById("text");

let todos = JSON.parse(localStorage.getItem(KEY) || "[]");

function save() {
  localStorage.setItem(KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = todo.done;
    box.onchange = () => { todo.done = box.checked; save(); render(); };
    const label = document.createElement("span");
    label.textContent = todo.text;
    if (todo.done) li.classList.add("done");
    li.append(box, label);
    list.append(li);
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = "";
  save();
  render();
};

render();
