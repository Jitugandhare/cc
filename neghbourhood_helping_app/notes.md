<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>Login</h2>
  <form id="loginForm">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
  <script src="app.js"></script>
  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem('token', result.token);
          window.location.href = 'dashboard.html';
        } else {
          alert(result.message || 'Login failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
      }
    });
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Register</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>Register</h2>
  <form id="registerForm">
    <input type="text" name="name" placeholder="Name" required />
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <select name="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <button type="submit">Register</button>
  </form>
  <script src="app.js"></script>
  <script>
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          alert('Registration successful. Please log in.');
          window.location.href = 'login.html';
        } else {
          alert(result.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
    });
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chat</title>
  <style>
    /* Reset some basic styling */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Body Styling */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f7f6;
      color: #333;
      padding: 20px;
    }

    /* Header */
    h2 {
      text-align: center;
      font-size: 2rem;
      color: #4a90e2;
      margin-bottom: 20px;
    }

    /* Chat List Styling */
    #chatList {
      list-style-type: none;
      padding: 0;
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
    }

    #chatList li {
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 1.1rem;
      color: #333;
    }

    #chatList li:nth-child(odd) {
      background-color: #e4e7eb;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }

      h2 {
        font-size: 1.8rem;
      }

      #chatList li {
        font-size: 1rem;
      }
    }
  </style>
</head>
<body>
  <h2>Chat</h2>
  <ul id="chatList"></ul>
  <script src="app.js"></script>
  <script>
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }

    async function loadChats() {
      try {
        const res = await fetch('http://localhost:5000/api/chat', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const chats = await res.json();
        const chatList = document.getElementById('chatList');
        chatList.innerHTML = '';
        chats.forEach((chat) => {
          const li = document.createElement('li');
          li.textContent = `${chat.sender.name}: ${chat.message}`;
          chatList.appendChild(li);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching chats.');
      }
    }

    loadChats();
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard</title>
  <style>
    /* Reset some basic styling */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Body Styling */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f7f6;
      color: #333;
      padding: 20px;
    }

    /* Header */
    h1 {
      text-align: center;
      font-size: 2.5rem;
      color: #4a90e2;
      margin-bottom: 20px;
    }

    /* Navigation Bar */
    nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    nav a {
      text-decoration: none;
      font-size: 1.1rem;
      color: #333;
      padding: 10px 20px;
      background-color: #e4e7eb;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    nav a:hover {
      background-color: #4a90e2;
      color: white;
    }

    /* Logout Button Styling */
    #logout {
      padding: 10px 20px;
      font-size: 1.1rem;
      background-color: #f15a29;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    #logout:hover {
      background-color: #d34f24;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        align-items: center;
      }

      nav a {
        margin-bottom: 10px;
      }
    }
  </style>
</head>
<body>
  <h1>Welcome to the Dashboard</h1>
  <nav>
    <a href="help.html">Help Requests</a>
    <a href="chat.html">Chat</a>
    <a href="notifications.html">Notifications</a>
    <a href="profile.html">Profile</a>
    <button id="logout">Logout</button>
  </nav>
  <script src="app.js"></script>
  <script>
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Help Requests</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    form {
      margin-bottom: 30px;
    }

    input, textarea, button {
      display: block;
      margin: 10px 0;
      padding: 10px;
      width: 300px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
      color: #333;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    h2 {
      color: #333;
    }
  </style>
</head>
<body>
  <h2>Create Help Request</h2>
  <form id="helpForm">
    <input type="text" name="category" placeholder="Category" required />
    <textarea name="description" placeholder="Description" required></textarea>
    <input type="text" name="location" placeholder="Location" required />
    <button type="submit">Submit</button>
  </form>

  <h2>Existing Help Requests</h2>
  <table id="helpTable">
    <thead>
      <tr>
        <th>User</th>
        <th>Category</th>
        <th>Description</th>
        <th>Location</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="helpList"></tbody>
  </table>

  <script>
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }

    document.getElementById('helpForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('http://localhost:5000/api/help', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (res.ok) {
          alert('Help request created.');
          e.target.reset();
          loadHelpRequests();
        } else {
          alert(result.message || 'Failed to create help request.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating help request.');
      }
    });

    async function loadHelpRequests() {
      try {
        const res = await fetch('http://localhost:5000/api/help', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const helpRequests = await res.json();
        const helpList = document.getElementById('helpList');
        helpList.innerHTML = '';  // Clear the table body

        helpRequests.forEach((req) => {
          const tr = document.createElement('tr');

          const userName = req.userId?.name || 'Anonymous';
          const category = req.category || 'No category';
          const description = req.description || 'No description';
          const location = req.location || 'Unknown';
          const status = req.status || 'open';

          tr.innerHTML = `
            <td>${userName}</td>
            <td>${category}</td>
            <td>${description}</td>
            <td>${location}</td>
            <td>${status}</td>
          `;

          helpList.appendChild(tr);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching help requests.');
      }
    }

    loadHelpRequests();
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neighbourhood Helping App</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    nav {
      background-color: #333;
      color: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    nav .logo {
      font-size: 1.5em;
      font-weight: bold;
    }

    nav ul {
      list-style-type: none;
      display: flex;
      gap: 15px;
    }

    nav ul li {
      display: inline;
    }

    nav ul li a {
      color: white;
      text-decoration: none;
      font-size: 1em;
    }

    nav ul li a:hover {
      text-decoration: underline;
    }

    .container {
      max-width: 900px;
      margin: 20px auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    form input,
    form textarea,
    form button,
    form select {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    form button {
      background-color: #28a745;
      color: white;
      border: none;
      cursor: pointer;
    }

    form button:hover {
      background-color: #218838;
    }

    .message {
      background-color: #e9ecef;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .chat-box {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
    }

    .notification {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .notification.unread {
      background-color: #f8d7da;
    }
  </style>
</head>

<body>
  <nav>
    <div class="logo">Helping App</div>
    <ul>
      <li><a href="dashboard.html">Dashboard</a></li>
      <li><a href="help.html">Help Requests</a></li>
      <li><a href="chat.html">Chat</a></li>
      <li><a href="notifications.html">Notifications</a></li>
      <li><a href="profile.html">Profile</a></li>
      <li><a href="#" onclick="logout()">Logout</a></li>
    </ul>
  </nav>
  <div class="container">
    <h2>Welcome to Neighbourhood Helping App</h2>
    <p>Select a page from the navigation bar to begin.</p>
  </div>

  <script>
    function logout() {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    }
  </script>
</body>

</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Notifications</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h2>Notifications</h2>
  <ul id="notificationList"></ul>
  <script src="app.js"></script>
  <script>
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }

    async function loadNotifications() {
      try {
        const res = await fetch('http://localhost:5000/api/notification', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const notifications = await res.json();
        const notificationList = document.getElementById('notificationList');
        notificationList.innerHTML = '';
        notifications.forEach((note) => {
          const li = document.createElement('li');
          li.textContent = `${note.message} - ${note.isRead ? 'Read' : 'Unread'}`;
          notificationList.appendChild(li);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching notifications.');
      }
    }

    loadNotifications();
  </script>
</body>
</html>
