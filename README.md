<h1 align="center">
    <img alt="Ecoleta" title="Ecoleta Logo" src="web/src/assets/logo.svg" width="200px" />
</h1>

<h4 align="center">
  🚀 Next Level Week 1.0 🚀
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Alcsaw/next-level-week-1">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Alcsaw/next-level-week-1">
  
  <a href="https://github.com/Alcsaw/next-level-week-1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Alcsaw/next-level-week-1">
  </a>

  <a href="https://github.com/Alcsaw/next-level-week-1/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Alcsaw/next-level-week-1">
  </a>

  <a href="https://github.com/Alcsaw/next-level-week-1/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-GNU3-brightgreen">
  </a>
  
</p>

![Cover](/readme-images/Ecoleta-Cover.png)

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#next-level-week---booster">Next Level Week</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#ecoleta">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-installation---running-locally">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-contributing">Contributing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licence">Licence</a>
</p>

<br>

## :rocket: Technologies

This project was developed using the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Celebrate](https://github.com/arb/celebrate)
- [React](https://reactjs.org)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)

## Next Level Week - Booster

Next Level Week is a micro bootcamp promoted by Rocketseat to teach fullstack development with Javascript/Typescript - Node.js on the back end, ReactJS on the front end and React Native for mobile - in a hands-on experience, by creating a fully functional application with web and mobile front-ends. One single programming language to dominate the entire development cycle, using technologies seen in many of the big companies today.


During the Next Level Week, Rocketseat provides 5 online classes - 1 each day from Monday to Friday - teaching how to build an app from scratch and finishing with an MVP. In this edition of the event we developed Ecoleta.

## Ecoleta

Ecoelta is a marketplace that allows companies to share their waste production items so interested buyers can find and contact the company.


For example, ACME Corp. may product eletronic waste, so it will create a profile and share this information alongside their contact info so when someone searches for eletronic waste on the region ACME Copr is located, he/she will find the company on the map.

![Searching for eletronic waste](/readme-images/map-mobile.jpg)


## 🔖 Layout

The app design was made by Rocketseat using [Figma](https://figma.com).

You can se the project mockup in [this link](https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-(Booster)).


## ⚙️ Installation - Running locally

Pre-requisits:
You need yarn package manager and expo-cli to run this project locally.

1. Clone the repo;
2. Start the back end:
    ```bash
    cd backend
    yarn install
    yarn knex:migrate
    yarn knex:seed
    yarn start
    ```
3. Start the front end:
    ```bash
    cd frontend
    yarn install
    yarn start
    ```
4. Start the mobile app:
    ```bash
    cd mobile
    yarn install
    yarn start
    ```
    
OBS.: You may need to update the localhost ip address is the files [server/src/config/server.ts](/server/src/config/server.ts) and [mobile/src/services/api.ts](/mobile/src/services/api.ts)


## 🤔 Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that I can review your changes (see [This page](https://help.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) for details)

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## :memo: Licence

This project is provided freely as open source software, under the GNU General Public
License. Check out the [LICENSE](LICENSE) for details.

---

Made with ♥ by [Augusto Schnorr](https://www.linkedin.com/in/alcsaw/) with the support of [Rocketseat](rocketseat.com.br)
