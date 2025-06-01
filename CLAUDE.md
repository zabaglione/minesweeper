# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, stylish Minesweeper web application built with vanilla HTML, CSS, and JavaScript. The game features a sleek UI with gradient backgrounds, animations, and responsive design.

## Development Setup

This is a static web application that requires no build process. Simply open `index.html` in a web browser to run the game.

### Local Development Server (Optional)
For local development with live reload, you can use any static file server:
- Python: `python -m http.server 8000`
- Node.js: `npx http-server`
- VS Code: Use the Live Server extension

## Common Commands

Since this is a vanilla JavaScript project, there are no build or test commands. Development consists of:
- Editing HTML/CSS/JavaScript files directly
- Refreshing the browser to see changes
- Using browser DevTools for debugging

## Architecture

### File Structure
- `index.html` - Main HTML file with game structure
- `styles.css` - All styling including animations and responsive design
- `game.js` - Complete game logic in a single Minesweeper class

### Game Logic (game.js)
- **Minesweeper Class**: Main game controller
  - Board initialization and mine placement
  - Cell revealing logic with flood fill for empty cells
  - Flag placement and removal
  - Win/loss condition checking
  - Timer functionality
  - Difficulty management (Easy/Medium/Hard)

### Key Features
- Three difficulty levels with different grid sizes and mine counts
- First-click safety (mines are placed after the first click)
- Right-click to flag cells
- Automatic revealing of adjacent empty cells
- Timer and mine counter
- Responsive design for mobile devices
- Smooth animations and visual effects