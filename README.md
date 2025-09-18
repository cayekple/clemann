# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Deploy to GitHub Pages

This project is preconfigured to deploy to GitHub Pages at:

- homepage: https://cayekple.github.io/clemann/
- gh-pages branch is used for static hosting.

You have two ways to deploy:

1) Local one-off deploy (manual)
- Ensure you are on main with latest changes pushed.
- Run: npm install (first time) and npm run deploy
- This builds the app and publishes build/ to the gh-pages branch using the gh-pages CLI.

2) Automatic deploy via GitHub Actions (recommended)
- A workflow is included at .github/workflows/deploy.yml.
- It builds and deploys on every push to main (or manual trigger via Actions tab).
- One-time repo settings:
  - Settings → Pages → Build and deployment → Source: GitHub Actions.
- After a successful run, your site will be available at the homepage URL above.

Notes
- The homepage field in package.json is already set for a repository subpath (cayekple.github.io/clemann). Keep it updated if you rename the repo.
- Node 18 LTS is used in CI to match CRA 5 expectations.
- No React Router is used. If you add routing later, configure a 404.html redirect strategy or HashRouter for GitHub Pages.
- Custom domain: Configure it under Settings → Pages (and add a CNAME file) if you use a custom domain.
