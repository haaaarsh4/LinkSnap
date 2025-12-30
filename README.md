# LinkSnap

LinkSnap is a full-stack URL shortening application that converts long URLs into compact, shareable short links and reliably redirects users back to the original destination. The project is built with a modern frontend interface and a Python backend web server that handles link creation, storage, and redirection logic.

This project demonstrates core concepts of web development, HTTP request handling, RESTful APIs, and frontend-backend integration.

---

## Features

- Shorten long URLs into unique short codes
- Redirect users from a short link to the original URL
- Clean and simple frontend interface
- Python backend web server with REST endpoints
- Persistent storage for shortened links
- End-to-end integration between frontend and backend

---

## How It Works

### URL Shortening Flow (POST Request)

1. The user enters a long URL in the frontend.
2. The frontend sends a POST request to the Python backend.
3. The backend validates the URL.
4. A unique short code is generated.
5. The mapping between the short code and the original URL is stored.
6. The backend returns the shortened URL to the frontend.

Example:
```

POST /shorten
Body: { "url": "[https://example.com/very/long/link](https://example.com/very/long/link)" }
Response: { "short_url": "[https://your-domain.com/abc123](https://your-domain.com/abc123)" }

```

---

### Redirection Flow (GET Request)

1. The user visits a shortened URL such as:
```

[https://your-domain.com/abc123](https://your-domain.com/abc123)

```
2. The backend receives a GET request with the short code.
3. The backend looks up the original URL associated with the code.
4. The server responds with an HTTP redirect.
5. The browser automatically navigates to the original URL.

This mirrors how production-grade URL shorteners work at a protocol level.

---

## Backend Architecture

- Built using Python
- Acts as a web server that listens for HTTP requests
- Handles:
  - POST requests to create shortened links
  - GET requests to resolve short codes and redirect users
- Validates URLs before storing them
- Generates short codes programmatically
- Uses persistent storage to maintain URL mappings
- Returns proper HTTP status codes and responses

The backend is designed to be simple, readable, and extensible.

---

## Frontend Overview

- Provides a user-friendly interface to shorten links
- Sends requests to the backend API
- Displays the generated shortened URL
- Focuses on clarity, responsiveness, and ease of use
- Fully decoupled from backend logic

---

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Python
- HTTP server framework
- RESTful API design

**Other**
- URL validation
- Persistent data storage
- Deployed backend environment

---

## Project Structure

```

LinkSnap/
├── backend/
│   ├── server.py
│   ├── database
│   └── utilities
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
└── README.md

```

---

## Why This Project

LinkSnap was built to explore how real-world URL shortening services work under the hood. It focuses on:

- Understanding HTTP requests and responses
- Designing clean backend APIs
- Connecting a frontend to a live backend service
- Implementing reliable redirection logic
- Building a complete, deployable full-stack application

---

## Future Improvements

- Custom short codes
- Link expiration support
- Analytics for click tracking
- Authentication and user accounts
- Custom domain support

---

## Getting Started

1. Clone the repository:
```

git clone [https://github.com/haaaarsh4/LinkSnap.git](https://github.com/haaaarsh4/LinkSnap.git)

```

2. Start the Python backend server.

3. Open the frontend in your browser.

4. Paste a long URL and generate a shortened link.

---

## License

This project is open-source and available for learning, experimentation, and extension.
