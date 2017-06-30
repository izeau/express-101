# Step 3: Express router

## Create routes

```sh
mkdir routes
touch routes/{articles,comments}.js
```

## Testing

```js
describe('GET /articles', function() {
  it('lists articles', () => request(app)
    .get('/articles')
    .expect(200)
    .expect(res => res.body.forEach(article => {
      assert.equal(typeof article.slug, 'string');
      assert.equal(typeof article.title, 'string');
      assert.equal(typeof article.body, 'string');
    }))
  );
});
```

## Routing

```js
const router = module.exports = require('express').Router({
  caseSensitive: true,
  strict: true,
});

router.get('/articles', (req, res) => {
  res.send(db.articles);
});

/* … */

router.use(bodyParser.json());

router.post('/articles', (req, res) => {
  res.send();

  db.articles = db.articles.concat({
    slug: slugify(req.body.title),
    title: req.body.title,
    body: req.body.body,
  });
});
```
