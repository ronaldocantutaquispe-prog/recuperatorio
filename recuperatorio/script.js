// ============================
// ESTADO
// ============================
let contacts = [];
let currentFilter = "";

// ============================
// REFERENCIAS AL DOM
// ============================
const form         = document.getElementById("contact-form");
const nameInput    = document.getElementById("name-input");
const phoneInput   = document.getElementById("phone-input");
const searchInput  = document.getElementById("search-input");
const listElement  = document.getElementById("contact-list");
const emptyMessage = document.getElementById("empty-message");
const counterEl    = document.getElementById("counter");

// ============================
// ID único
// ============================
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ============================
// RENDER
// ============================
function render() {
  const query = currentFilter.trim().toLowerCase();
  const visibleContacts = query
    ? contacts.filter(c => c.name.toLowerCase().includes(query))
    : contacts;

  listElement.innerHTML = "";

  visibleContacts.forEach(contact => {
    const li = document.createElement("li");
    li.className = "contact-item";

    const info = document.createElement("div");
    info.className = "contact-item__info";

    const nameEl = document.createElement("span");
    nameEl.className = "contact-item__name";
    nameEl.textContent = contact.name;

    const phoneEl = document.createElement("span");
    phoneEl.className = "contact-item__phone";
    phoneEl.textContent = contact.phone;

    info.appendChild(nameEl);
    info.appendChild(phoneEl);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => deleteContact(contact.id));

    li.appendChild(info);
    li.appendChild(deleteBtn);
    listElement.appendChild(li);
  });

  if (contacts.length === 0) {
    emptyMessage.textContent = "Todavia no agregaste contactos.";
    emptyMessage.style.display = "block";
  } else if (visibleContacts.length === 0) {
    emptyMessage.textContent = "No se encontraron contactos con ese nombre.";
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  counterEl.textContent = contacts.length;
}

// ============================
// AGREGAR
// ============================
function addContact(name, phone) {
  const trimmedName  = name.trim();
  const trimmedPhone = phone.trim();

  if (!trimmedName || !trimmedPhone) return false;

  contacts.push({
    id: generateId(),
    name: trimmedName,
    phone: trimmedPhone
  });

  render();
  return true;
}

// ============================
// ELIMINAR
// ============================
function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  render();
}

// ============================
// EVENT LISTENERS
// ============================
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = addContact(nameInput.value, phoneInput.value);
  if (ok) {
    form.reset();
    nameInput.focus();
  } else {
    alert("Debes completar nombre y teléfono.");
  }
});

searchInput.addEventListener("input", (e) => {
  currentFilter = e.target.value;
  render();
});

// ============================
// RENDER INICIAL
// ============================
render();