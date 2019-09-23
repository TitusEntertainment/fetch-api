# Open source reddit caching api

This open source api fetches and caches from a set of subreddits from [reddit](https://reddit.com) and caches them every six hours! It then allows you, the user to fetch a random post!

> Want another subreddit to be cached? Make an issue, or a pull request.

**Current queries**:

unixporn, nsfw, meme, hentai

## Example with nodejs and node fetch

> For this example we will be using [nodejs](https://nodejs.org) and the package [node-fetch](https://www.npmjs.com/package/node-fetch)

begin by doing the following command in your project directory

`npm i node-fetch`

or if you use yarn

`yarn add node-fetch`

now that we have all the dependencies we need, we'll make a js file!

so in our js file we will begin by doing

```js
const fetch = require('node-fetch');
```

now let's tell the api what we want back from it! For this example we'll be fetching a random cached post from r/unixporn

```js
const fetch = require('node-fetch');

const query = `
    {
        unixporn {
            title
            url
            image
        }
    }
`;
```

Note: the api is built with GraphQL so what we define above, is exatly what we will get back!

alright, so now lets make sure that we'll fetch properly via a post request.

```js
const fetch = require('node-fetch');

const query = `
    {
        unixporn {
            title
            url
            image
        }
    }
`;

const options = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({ query }),
};
```

The above is what we'll pass in, once we do the post request (note that the post request will also send back the data that we want). So let's do it!

```js
const fetch = require('node-fetch');

const query = `
    {
        unixporn {
            title
            url
            image
        }
    }
`;

const options = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({ query }),
};

// note that the url bellow is what's hosted currently! If you self-host this url will be different

fetch('http://titusentertainment.xyz/api', options)
  .then(res => res.json())
  .then(res => console.log(res.data));
```

and we're done!

Output example:

```bash
{
    unixporn:
    {
        title: '[bspwm] My daily driver as of recently...',
        url:
        '/r/unixporn/comments/d49gz6/bspwm_my_daily_driver_as_of_recently/',
        image: 'https://i.redd.it/2zzzaog2ylm31.png'
    }
}
```

All queries follow this pattern:

```js
    {
        unixporn {
            title
            // note that the body is not allways filled as this is dependent on the post
            body
            image
            url
        }
    }
```

## Selfhosting

First of all, make sure that you either have [mongoDB](https://mongodb.com) either installed or a [mongoDB atlas](https://www.mongodb.com/cloud/atlas) apllication registered

Begin by opening a terminal and `cd` to the desired path where you will store the files.

Then do:

```bash
git clone https://github.com/TitusEntertainment/fetch-api/blob/master/src/app.ts
```

and then `cd` into by doing

```bash
cd fetch-api
```

install the dependencies:

npm:

```bash
npm install
```

or with yarn

```bash
yarn install
```

while we're at it, we're going to install [typescript](https://www.npmjs.com/package/typescript) globaly as well because we'll need to compile the ts code into js. We'll also throw in [pm2](https://www.npmjs.com/search?q=pm2) and [@types/node](https://www.npmjs.com/package/@types/node)

```bash
npm i -g typescript @types/node pm2
```

now procede to create a file in the root directory called **.env**

In here, we will define a session secret (this is for security) and our url to MongoDB

the file should look like this:

```js
CREDENTIALS = mymongodburl;
SESSION_SECRET = mysessionsecret;
```

you can generate a session secret with some thing like [randomkeygen](https://randomkeygen.com/)

now let's compile the code:

```bash
tsc -p tsconfig.json
```

once that's done you can start the application with pm2:

```bash
pm2 start dist/app.js
```

Success! The Api should now be running on localhost:3200/api

## Author

<img src="https://i.imgur.com/rAvP1k0.jpg" width="100" height="100" align="left" style="float: left; margin: 0 10px 0 0;" alt="Titus avatar" >

**Fetch Api** © [Titus](https://github.com/TitusEntertainment).  
Authored and maintained by Titus.
