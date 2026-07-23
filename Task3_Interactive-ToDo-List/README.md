# Task 3 — Interactive To-Do List

This project is part of my Frontend Web Development Internship at Neurofive Solutions.

## Overview
I built an interactive to-do list using HTML, CSS, and JavaScript. The main goal of this task was to practice DOM manipulation, event handling, and dynamic UI updates.

## Features
- Add a new task
- Mark a task as completed
- Delete a task
- Live counter for remaining tasks
- Filter tasks by All, Active, and Completed
- Dark and Light mode toggle
- Responsive and modern UI design

## Technologies Used
- HTML5
- CSS3
- JavaScript

## How I Kept DOM and Data in Sync
I stored all tasks in a JavaScript array, where each task has an id, text, and completed status. Whenever the user adds, deletes, or completes a task, the array updates first. After updating the array, I call the render function to rebuild the visible list using DOM creation methods. This keeps the displayed UI and the JavaScript data fully synchronized.

## What I Learned
This task helped me understand how JavaScript can update the page dynamically without reloading it. I practiced using document.querySelector, addEventListener, createElement, and array methods for interactive functionality. I also learned how filtering works and how local storage can improve user experience by saving data in the browser.

## Live Demo
https://task3-interactive-todo-list.vercel.app/

## GitHub Folder
https://github.com/FaisalIqbal216/NeurofiveSolutions-Internship/tree/main/Task3_Interactive-ToDo-List
