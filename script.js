const getUserData = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

const saveUserData = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

const makeUserTable = () => {
    const users = getUserData();
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>
                <button class="editButton">EDIT</button>
                <button class="deleteButton">DELETE</button>
            </td>
        `;

        const editButton = row.querySelector('.editButton');
        const deleteButton = row.querySelector('.deleteButton');

        editButton.addEventListener('click', editUser.bind(null, index));
        deleteButton.addEventListener('click', deleteUser.bind(null, index));

        tableBody.appendChild(row);
    });
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const userIndex = document.getElementById('user-index').value;

    if (name && email && contact) {
        const user = { name, email, contact };
        if (userIndex === '') {
            addUser(user);
        } else {
            updateUser(userIndex, user);
        }

        document.getElementById('user-form').reset();
        document.getElementById('user-index').value = '';
        document.getElementById('submit-button').textContent = ' ADD USER ';
    } else {
        alert("All details are required!");
    }
};

const addUser = (newUser) => {
    const users = getUserData();
    users.push(newUser);
    saveUserData(users);
    makeUserTable();
};

const updateUser = (index, updatedUser) => {
    const users = getUserData();
    users[index] = updatedUser;
    saveUserData(users);
    makeUserTable();
};

const editUser = (index) => {
    const users = getUserData();
    const user = users[index];

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('contact').value = user.contact;

    document.getElementById('user-index').value = index;
    document.getElementById('submit-button').textContent = ' UPDATE USER ';
};

const deleteUser = (index) => {
    const users = getUserData();
    if (confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        saveUserData(users);
        makeUserTable();
    };
}

makeUserTable();
