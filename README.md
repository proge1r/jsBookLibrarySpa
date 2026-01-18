# Book Linrary SPA 📚

A modern, high-performance Single Page Application (SPA) for book lovers. This project demonstrates advanced JavaScript techniques including custom routing, persistent storage, and dynamic UI rendering.

## ✨ Features

- **SPA Architecture**: Seamless navigation using the History API (Hash-based) ensuring zero page reloads.
- **Smart Search**: Real-time filtering system that allows searching by book title or author.
- **Personal Collection**: Add books to your private library with data persistence using `localStorage`.
- **Dynamic Theming**: Elegant Dark and Light modes with a custom-built toggle switch.
- **Modern UI**: Fully responsive grid layout with a "Read Now" focus and intuitive action buttons.
- **Reliable Data Sync**: Implements `navigator.sendBeacon` to ensure user collection status is synced even when closing the tab.

## 🛠️ Technical Stack

- **HTML5**: Semantic structure for better accessibility.
- **CSS3**: Advanced layouts using Flexbox and CSS Grid, plus native CSS Variables for theming.
- **JavaScript (ES6+)**: 
  - Custom Hash-router.
  - State management for the book collection.
  - Event delegation for optimal performance.
  - JSON handling for local storage.

## 📁 Project Structure

- `library-main.html` - The application shell and entry point.
- `library-styles.css` - Custom styles, themes, and layout definitions.
- `library-core.js` - Core application logic, routing, and data handling.
- `imgs/` - Directory containing book cover assets (b1.jpg to b8.jpg).

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/bookLibrarySpa.git](https://github.com/your-username/bookLibrarySpa.git)
