const form = document.getElementById('person-form');
const tbody = document.querySelector('#people-table tbody');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const cancelBtn = document.getElementById('cancel-edit');

let people = JSON.parse(localStorage.getItem('people') || '[]');
let editIndex = -1;

function saveToStorage() {
  localStorage.setItem('people', JSON.stringify(people));
}

function render() {
  tbody.innerHTML = '';
  people.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.phone}</td>
      <td>
        <button data-act="edit" data-i="${i}">Editar</button>
        <button data-act="del" data-i="${i}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const person = { name: nameInput.value.trim(), email: emailInput.value.trim(), phone: phoneInput.value.trim() };
  if (editIndex >= 0) {
    people[editIndex] = person;
    editIndex = -1;
    cancelBtn.style.display = 'none';
  } else {
    people.push(person);
  }
  saveToStorage();
  form.reset();
  render();
});

tbody.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const i = Number(btn.dataset.i);
  if (btn.dataset.act === 'edit') {
    const p = people[i];
    nameInput.value = p.name;
    emailInput.value = p.email;
    phoneInput.value = p.phone;
    editIndex = i;
    cancelBtn.style.display = '';
  } else if (btn.dataset.act === 'del') {
    if (confirm('¿Eliminar esta persona?')) {
      people.splice(i,1);
      saveToStorage();
      render();
    }
  }
});

cancelBtn.addEventListener('click', () => {
  editIndex = -1;
  form.reset();
  cancelBtn.style.display = 'none';
});

render();
