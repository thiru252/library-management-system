const API = "https://api.render.com/deploy/srv-d5dkt4pr0fns73aktttg?key=Ny-l3Y7S6Lg";

let allBooks = [];

async function loadBooks() {
  const res = await fetch(API);
  allBooks = await res.json();
  displayBooks(allBooks);
}

function displayBooks(books) {
  const table = document.getElementById("bookTable");
  table.innerHTML = "";

  books.forEach(book => {
    table.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${book.publishedYear}</td>
        <td>${book.availableCopies}</td>
        <td>
          <button class="update" onclick="increaseCopies('${book._id}', ${book.availableCopies})">+1</button>
          <button class="delete" onclick="deleteBook('${book._id}', ${book.availableCopies})">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* CREATE */
async function addBook() {
  const book = {
    title: title.value,
    author: author.value,
    category: category.value,
    publishedYear: Number(year.value),
    availableCopies: Number(copies.value)
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  loadBooks();
}

/* UPDATE */
async function increaseCopies(id, current) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ availableCopies: current + 1 })
  });

  loadBooks();
}

/* DELETE */
async function deleteBook(id, copies) {
  if (copies !== 0) {
    alert("Cannot delete unless copies = 0");
    return;
  }

  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadBooks();
}

/* SEARCH */
function searchBooks() {
  const type = document.getElementById("searchType").value;
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allBooks.filter(book => {
    if (type === "title") return book.title.toLowerCase().includes(value);
    if (type === "category") return book.category.toLowerCase().includes(value);
    if (type === "year") return book.publishedYear.toString() === value;
  });

  displayBooks(filtered);
}

loadBooks();
