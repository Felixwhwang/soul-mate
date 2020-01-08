# Soulmate
A web application for young people, and who want to find the ideal other half in his/her life.

## Technologies Used
- React.js
- Webpack 4
- MySQL
- PHP
- HTML5
- CSS3
- AWS EC2

## Features
- User can sign up to use the app.
- User can create a new account.
- User can describe aspects of themselves including picture, Email, password, gender, description himself/herself, expectations, location, birthday(age), Ethnics, Religion.
  - Ethnics: Asian, Caucasian, Latino, Black, Middle Eastern
  - Religion:  Christian, Buddhist, Catholic, Hindu, Muslim, None
- User can update their information.
- User can check his/her own information.
- User can view a list of potential matches.
- User can likes or dislikes to other ptential match.
- User can send a message to a match.
- User can update password.
- User can update their photos.
- User can filter the matches.
- User can view the message history.
- User can safety logout.
- User can use app more conveniently through user menu.

## Preview
![soulmate](https://user-images.githubusercontent.com/31264160/71944564-12f6d380-31bc-11ea-9ee7-d4ac3c3ee3b3.gif)

## Live Demo
Try the application live at https://soulmate.wenhaowang.net

**Windows/Linux user:** Ctrl + Shift + i to open dev tools

**Mac OS Chrome user:** ⌘ + Shift + C followed by ⌘ + Shift + M to open dev tools

preview in iPhone X for optimal viewing

## Development
### System Requirements
- npm 6 or higher
- MySQL 7 or higher

### Getting Start
1. Clone the repository.

    ```bash
    $git clone https://github.com/Felixwhwang/soulmate
    $cd soulmate
    ```
2. Install all dependencies with NPM.

    ```bash
    $npm install
    ```

3. Create you own table in local phpMyAdmin named `soulMate` with `utf8mb4_unicode_ci`.

4. Import pre-set dummy data into your new created table `soulMate`.

    ```bash
    $npm run db:import
    ```

5. Build all necessary js files.

    ```bash
    $npm run build
    ```    

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```bash
    $npm run dev
    ```
