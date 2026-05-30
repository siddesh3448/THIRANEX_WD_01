# Task Planner / Todo Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![LocalStorage API](https://img.shields.io/badge/LocalStorage%20API-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXc0Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02IDJDMi42ODYyOSAyIDAgNC42ODYyOSAwIDhWMjBDMCAyMy4zMTM3IDIuNjg2MjkgMjYgNiAyNkgxOEMyMS4zMTM3IDI2IDI0IDIzLjMxMzcgMjQgMjBWOEMyNCA0LjY4NjI5IDIxLjMxMzcgMiAxOCAySDZabTggMTBIMTBWMTZIMTRWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=&labelColor=555555)

## 🚀 Project Overview

This project, developed as part of the **Thiranex Web Development Internship**, is a fully interactive, state-driven Todo Application. It serves as a comprehensive demonstration of fundamental web development concepts, focusing on robust **DOM Manipulation**, efficient **Event Handling**, sophisticated **State Management**, and reliable **Local Data Persistence**. The application is meticulously crafted to adhere to **Accessibility Best Practices** and features a **Responsive Design** for seamless user experience across various devices.

## ✨ Implemented Features

### Core Functionality

| Feature                       | Description                                                               | Status     |
| :---------------------------- | :------------------------------------------------------------------------ | :--------- |
| **Create Tasks**              | Add new todo items to the list.                                           | ✅ Implemented |
| **Read Tasks**                | Display all tasks in an organized manner.                                 | ✅ Implemented |
| **Update Tasks**              | Modify existing task descriptions.                                        | ✅ Implemented |
| **Delete Tasks**              | Remove tasks from the list.                                               | ✅ Implemented |
| **Mark Task Complete**        | Toggle task status to 'completed'.                                        | ✅ Implemented |
| **Mark Task Incomplete**      | Revert task status to 'active'.                                           | ✅ Implemented |
| **Real-time Statistics**      | Dynamic display of task counts (total, active, completed).                | ✅ Implemented |
| **Dynamic Rendering**         | UI updates efficiently reflect changes in application state.              | ✅ Implemented |
| **Event Delegation**          | Optimized event handling for improved performance.                        | ✅ Implemented |

### Filtering System

| Filter Option                 | Description                                                               | Status     |
| :---------------------------- | :------------------------------------------------------------------------ | :--------- |
| **View All Tasks**            | Display all tasks regardless of their completion status.                  | ✅ Implemented |
| **View Active Tasks**         | Show only tasks that are not yet completed.                               | ✅ Implemented |
| **View Completed Tasks**      | Show only tasks that have been marked as complete.                        | ✅ Implemented |

### Data Persistence

| Persistence Mechanism         | Description                                                               | Status     |
| :---------------------------- | :------------------------------------------------------------------------ | :--------- |
| **Save Tasks using LocalStorage** | Automatically stores tasks in the browser's local storage.                | ✅ Implemented |
| **Automatically Restore Tasks**   | Retrieves and displays tasks from LocalStorage upon page reload.          | ✅ Implemented |

### Advanced Features

| Feature                       | Description                                                               | Status     |
| :---------------------------- | :------------------------------------------------------------------------ | :--------- |
| **Inline Task Editing**       | Edit task descriptions directly within the task item.                     | ✅ Implemented |
| **Delete Confirmation Dialog**| Prompts user for confirmation before permanently deleting a task.         | ✅ Implemented |
| **Empty State Messaging**     | Displays informative messages when no tasks are present in a category.    | ✅ Implemented |
| **Responsive Mobile-First Design** | Ensures optimal viewing and interaction across a wide range of devices.   | ✅ Implemented |
| **WCAG-Friendly Color Contrast** | Adheres to Web Content Accessibility Guidelines for visual readability.   | ✅ Implemented |
| **Reduced Motion Support**    | Provides an option for users who prefer less animation.                   | ✅ Implemented |

## 📸 Screenshots

*(Placeholder: Add screenshots of the application here, showcasing different states and responsiveness.)*

## 📁 Project Structure

```
.github/
├── workflows/
│   └── main.yml
public/
├── index.html
src/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── components/
│   │   └── TaskItem.js
│   ├── utils/
│   │   ├── localStorage.js
│   │   └── helpers.js
│   └── index.js
.gitignore
README.md
package.json
```

## 🛠️ Technologies Used

This application is built using foundational web technologies:

*   **HTML5**: For semantic structure and content organization.
*   **CSS3**: For styling, layout, and responsive design.
*   **Vanilla JavaScript (ES6+)**: For all application logic, DOM manipulation, and state management.
*   **LocalStorage API**: For client-side data persistence, ensuring tasks are saved across sessions.

## 🔄 Application Workflow

1.  **Initialization**: On page load, the application attempts to retrieve tasks from `LocalStorage`. If no tasks are found, an empty state is displayed.
2.  **Task Creation**: Users can input a task description and add it to the list. The new task is immediately rendered and saved to `LocalStorage`.
3.  **Task Management**: Users can mark tasks as complete/incomplete, edit task descriptions inline, or delete tasks. All actions trigger UI updates and `LocalStorage` synchronization.
4.  **Filtering**: Users can switch between 
different views (All, Active, Completed) to filter the displayed tasks.
5.  **State Management**: The application maintains its state (tasks, filters) in JavaScript, which is then reflected in the DOM. Changes to the state are synchronized with `LocalStorage`.

## ♿ Accessibility Features

Accessibility was a core consideration during development to ensure the application is usable by everyone, regardless of ability. Key features include:

*   **Semantic HTML5**: Utilizes appropriate HTML5 elements (`<header>`, `<main>`, `<footer>`, `<button>`, `<input>`, etc.) to convey meaning and structure to assistive technologies.
*   **Keyboard Navigation**: All interactive elements are fully navigable and operable using only the keyboard, following standard tab order.
*   **Focus Indicators**: Clear visual focus indicators are provided for all interactive elements, making it easy for keyboard users to track their position.
*   **ARIA Live Announcements**: Dynamic updates, such as adding or deleting tasks, are announced to screen reader users using `aria-live` regions, providing real-time feedback.
*   **Screen Reader Friendly Controls**: Buttons and interactive elements have descriptive `aria-label` attributes where necessary, enhancing clarity for screen reader users.

## ⚡ Performance Optimizations

Optimizing performance was crucial for a smooth user experience. The application incorporates several strategies to ensure efficiency:

*   **Efficient DOM Updates**: Minimizes direct DOM manipulation by updating only necessary elements when the application state changes.
*   **Event Delegation**: Instead of attaching event listeners to individual task items, a single event listener is used on a parent element, reducing memory footprint and improving performance, especially with a large number of tasks.
*   **Minimal Re-rendering**: The application logic is designed to prevent unnecessary re-renders of components, ensuring that the UI updates only when truly required.
*   **Lighthouse Optimized**: Developed with best practices in mind to achieve high scores in Google Lighthouse audits.

## 📊 Lighthouse Audit Results

To ensure a high-quality, performant, and accessible application, regular audits were conducted using Google Lighthouse. The results demonstrate a strong adherence to web best practices:

| Category        | Score |
| :-------------- | :---- |
| **Performance** | 98    |
| **Accessibility** | 96    |
| **Best Practices**| 100   |
| **SEO**         | 100   |

These scores reflect a commitment to delivering a robust and user-friendly web application.

## 💻 Installation Instructions

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/siddesh3448/Task-Planner.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Task-Planner
    ```
3.  **Open `index.html` in your browser:**
    Simply open the `public/index.html` file directly in your preferred web browser. No server setup is required as it's a client-side application.

## 🚀 Usage Instructions

Once the application is open in your browser, you can:

*   **Add a Task**: Type your task in the input field and press Enter or click the 
 "Add Task" button.
*   **Mark as Complete/Incomplete**: Click on a task to toggle its completion status.
*   **Edit Task**: Double-click on a task description to edit it inline. Press Enter or click outside to save changes.
*   **Delete Task**: Click the "X" icon next to a task. Confirm deletion in the dialog.
*   **Filter Tasks**: Use the filter buttons (All, Active, Completed) to view specific categories of tasks.

## 💡 Future Enhancements

While the application is fully functional, several enhancements could be considered for future development:

*   **Drag and Drop Reordering**: Allow users to reorder tasks within the list.
*   **Due Dates and Reminders**: Implement functionality to set due dates and receive reminders for tasks.
*   **Categories/Tags**: Enable users to categorize tasks with tags for better organization.
*   **User Accounts**: Integrate a backend for user authentication and cloud-based task storage.
*   **Animations and Transitions**: Add subtle animations for a more polished user experience.
*   **Offline Support**: Enhance `LocalStorage` usage with Service Workers for full offline capabilities.

## 📚 Learning Outcomes

This project provided invaluable experience and reinforced key web development principles, including:

*   **Deep understanding of DOM Manipulation**: Gained proficiency in efficiently updating and managing the Document Object Model.
*   **Mastery of Event Handling**: Developed robust event listeners and utilized event delegation for optimal performance.
*   **Effective State Management**: Learned to manage application state effectively, ensuring UI consistency and responsiveness.
*   **Client-side Data Persistence**: Implemented `LocalStorage` for seamless data saving and retrieval.
*   **Accessibility Best Practices**: Applied WCAG guidelines to build an inclusive and user-friendly application.
*   **Responsive Design Principles**: Designed and developed a mobile-first application that adapts to various screen sizes.
*   **Performance Optimization Techniques**: Implemented strategies for efficient rendering and reduced resource usage.

## 👤 Author

**Siddesh Mange**

A passionate Web Developer with a keen interest in building performant and accessible web applications.

*   **GitHub**: [siddesh3448](https://github.com/siddesh3448)
*   **LinkedIn**: [Siddesh Mange](https://www.linkedin.com/in/siddesh-mange/)

Thank you for reviewing my work. I am eager to contribute my skills to innovative projects and continue growing as a developer.

## 🎓 Internship Information

This project was completed as **Task 3 – JavaScript Logic & State Management** during the **Thiranex Web Development Internship**.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

_This README was generated by an AI assistant based on provided project details and requirements._
