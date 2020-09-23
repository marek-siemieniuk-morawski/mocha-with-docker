# Example usage of Mocha with Docker

## Goal 

The main goal of the repo is to show how to marry Mocha with Docker in order to make your end-to-end tests even greater. There are quite a few benefits of test dockerization. It:

- reduces test execution time, which is especially visible in scale. 
- elimates one of the stages - the building - which makes the tests more reliable in general
- gives more control over the running environment which increases even more the reliability of the whole thing  
- lets your colleagues run the tests on their local machines, no matter what OS they're using or in what tech they're working on in daily basis

## Approach

While developing high-level tests, like for UI, it's pretty often desired to run only a subset of tests or to inject a variable, like environment under test, while running the scenarios. In general, mocha allows to filter tests in two ways: based on path and by `--grep` parameter. 

Therefore, for presentation purposes, I've decided to create repo that contains tests of more than one suite. By suite I mean a directory inside `/tests`, and there are three of them: `end-to-end`, `foo`, `bar`. Let's say that both `foo` and `bar` contain tests of some service, and I believe that `end-to-end` is self-explanatory.

Also, I've put `it()` blocks inside nested `describe()`s, which only include tags like `@smoke` or `@regression`. This way we can use the grep feature to cherry pick tests.

In result, we gained ability of running only those tests that we want.

```
  mocha ./tests/end-to-end/*.test.js --grep "@smoke"
```

and we can still easily set env variables:

```
  ENV="staging" mocha ./tests/end-to-end/*.test.js --grep "@smoke"
```

## Dockerization

To make it work with Docker I've decided to go with a bash script, which is an entrypoint for Docker image. Nothing fancy there, but it gives us a lot of space for future development & improvements. To make my life easier, I defined a script for each suite in `package.json` 
```
  "scripts": {
    "test": "mocha ./tests/**/*.test.js",
    "test:e2e": "mocha ./tests/end-to-end/*.test.js",
    "test:bar": "mocha ./tests/bar/*.test.js",
    "test:foo": "mocha ./tests/foo/*.test.js"
  },
```

Mainly, I did it because of two reasons:
- we need to run the tests without docker as well, so having something like `test:e2e` is simply useful
- I wanted to reduce complexity of bash script 

This way, to make it work inside Docker container we must pass two or three variables into `docker run` commend:

```
  ENV="$ENV" npm run test:"${DOMAIN}"
```
```
  ENV="$ENV" npm run test:"${DOMAIN}" -- -g "$GREP"
```

which can be done like this:

```
  docker run -e ENV="staging" -e DOMAIN="foo" -e GREP="@smoke" mocha-with-docker:latest 
```

To build an image, execute:
```
  docker build -t mocha-with-docker .  
```

## Further steps

Depending on the needs, you'll be probably required to install the necessary library dependecies into Dockerfile. It's always a good idea to search for 'how to' manuals in the official documentation of the particular tool. Here are some of them:

- [Selenium](https://github.com/SeleniumHQ/docker-selenium)
- [Puppeteer](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker)
- [Cypress](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

To copy test reports from non-running container you can use `docker cp` command, like this:
```
  docker cp ${DOCKER_CONTAINER_NAME}:/usr/src/app/${REPOSITORY_NAME}/${TEST_OUTPUT_FILE} ./
```
