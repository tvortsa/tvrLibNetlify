# Gatsby + Netlify CMS Starter

В этом репо содержится примерный бизнес-сайт, построенный с помощью [Gatsby](https://www.gatsbyjs.org/), и [Netlify CMS](https://www.netlifycms.org): **[Demo Link](https://gatsby-netlify-cms.netlify.com/)**.

Он следует [JAMstack архитектуре](https://jamstack.org) используя Git как единственный достоверный источник, и [Netlify](https://www.netlify.com) для непрерывного развертывания, и CDN distribution.

## Prerequisites

- Node (мы рекомендуем версию v8.2.0 или выше)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

## Getting Started (Recommended)

Netlify CMS может работать в любой среде веб-интерфейса, но самый быстрый способ проверить это - запустить его на предварительно сконфигурированном стартовом сайте Netlify. В нашем примере это шаблон Kaldi coffee company template (адаптирован из [One Click Hugo CMS](https://github.com/netlify-templates/one-click-hugo-cms)). Используйте приведенную ниже кнопку, чтобы создать и развернуть свою собственную копию репозитория:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

### Локальный доступ
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
Для локального тестирования CMS, вам нужно будет запустить производственную сборку сайта:
```
$ npm run build
$ npm run serve
```

## Getting Started (Without Netlify)
```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/AustinGreen/gatsby-starter-netlify-cms/
$ cd [SITE_DIRECTORY_NAME]
$ npm run build
$ npm run serve
```

### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
