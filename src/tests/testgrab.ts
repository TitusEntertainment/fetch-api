import fetch from 'node-fetch';

const REDDIT_URL = 'https://www.reddit.com/r/unixporn.json?limit=50&sort=hot&raw_json=1',
  INTERVAL = 1000 * 60 * 60 * 6, //last num = hours
  MINIMUM_INTERVAL = 1000 * 60 * 15; //last num = minutes

const getPosts = async () => {
  console.log('Fetching a new set of posts');
  await fetch(REDDIT_URL)
    .then(res => res.json())
    .then(json => {
      const posts = json.data.children.map(post => post.data);
      console.log(posts);
    });
};

getPosts();
