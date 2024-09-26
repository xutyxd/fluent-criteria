<p align="center">
  <a href="https://github.com/xutyxd/fluent-criteria">
    <picture>
      <source srcset="fluent-criteria-logo.png">
      <img alt="Fluent criteria logo" src="fluent-criteria-logo.png">
    </picture>
  </a>
</p>

<h1 align="center">
  🌊 Criteria for JavaScript & TypeScript in a fluent way
</h1>

<p align="left">
    <img src="https://img.shields.io/npm/dw/fluent-criteria"/>
    <img alt="NPM Unpacked Size" src="https://img.shields.io/npm/unpacked-size/fluent-criteria">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/fluent-criteria">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/fluent-criteria">
</p>

## 📥 Installation

```sh
npm i fluent-criteria
```

## 🕹️ Playground
https://stackblitz.com/edit/fluent-criteria-example

## 📖 Usage

```ts
import { FluentCriteria } from 'fluent-criteria';
import { IUser, users } from './users.dataset';

const criteria = new FluentCriteria<IUser>();

const usersWithEmail = criteria.search.email.defined.find(users);
console.log('Users with email: ', usersWithEmail);

const usersAsAdmin = criteria.search.role.equal('admin').find(users);
console.log('Users that are admin: ', usersAsAdmin);

const usersWithThumbnailWithPixels =
  criteria.search.profile.thumbnail.pixels.defined.find(users);
console.log('Users with thumbnail and pixels: ', usersWithThumbnailWithPixels);

```

## 📦 Packages

### 📦 CommonJS

```js
const { FluentCriteria } = require('fluent-criteria');
```

### 📦 ESM

```js
import { FluentCriteria } from 'fluent-criteria';
```

### 📦 TypeScript

```ts
import { FluentCriteria } from 'fluent-criteria';
```

## 📝 License

This project is licensed under the `GNU AFFERO GENERAL PUBLIC LICENSE `- see the [LICENSE](LICENSE) file for details