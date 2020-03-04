# express-generator-typescript-react
Express' application generator, with TypeScript, Jest, ESLint and optional GraphQL and React support, which's inspired by [Sean Maxwell's express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) as starting point.


## Installation

```sh
$ npm install -g express-generator-typescript-react
```

## Quick Start

The quickest way to get started with express is to utilize the executable `express(1)` to generate an application as shown below:

Create the app:

```bash
$ express --view=hbs /tmp/foo && cd /tmp/foo
```

Install dependencies:

```bash
$ npm install
```

Start your Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```

## Command Line Options

This generator can also be further configured with the following command line flags.

    -V, --version        output the version number
        --with-auth      add authentication support
    -h, --help           output usage information

## Why these packages

1. ### express 
    1. **ts-node**: Running `.ts` files directly
1. ### typescript
    1. **eslint**
        1. [TSLint will be replaced by ESLint`](https://github.com/palantir/tslint/issues/4534)
        1. Formatting codes with **prettier** together
            >Didn't use **prettier-eslint** as it doesn't work well with ESLint+Typescript
    1. **prettier**: The most popular code formatter
    1. **reflect-metadata**: Supporting Decorator
1. ### jest
    1. **ts-jest**: Running `.test.ts` files directly
    1. **supertest**: Testing API endpoints
1. ### nodemon
    Watching files changes then live reloading
1. ### husky
    Auto-triggering test and lint before Git commit/push
1. ### module-alias
    Flatting the code base structure, for easier module referring, i.e. you don't have to code `import {module1, module2} from '../../../shared'`, just import designate alias `import {module1, module2} from '@shared'`

## Credit
[Sean Maxwell](https://github.com/seanpmaxwell/express-generator-typescript)
