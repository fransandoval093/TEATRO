const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

// // REE | Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// REE | Puppeteer Endpoint
app.get('/api/getList', async (req, res) => {

  console.log("REQUEST | params , query , route");
  console.log("+++++++++");
  console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log(req.route.path); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log("+++++++++");

  const { moviename, movieyear } = req.query

  async function puppet() {
    // PUPPET | TRY-CATCH Error handling for remote website requests
    try {
      //PUPPET | Initialize Puppeteer
      const browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--enable-low-end-device-mode",
          "--single-process",
        ],
      });

      // PUPPET | Specify an page url to open
      const page = await browser.newPage();

      // PUPPET | Specify page url
      await page.goto(
        `https://mycima.actor:2083/watch/%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9-%D9%81%D9%8A%D9%84%D9%85-${moviename}-${movieyear}-%D9%85%D8%AA%D8%B1%D8%AC%D9%85/`
      );

      console.log("PUPPET | Page has been evaluated!");

      const data = await page.evaluate(() => {
        const srcs = Array.from(
          document.querySelectorAll("btn")
        ).map((btn) => btn.getAttribute("data-url"));
        return srcs;
      });

      console.log("PUPPET | Puppet Strings from page have been loaded.");
      console.log("PUPPET RESPONSE | puppetstrings \n", data);

      // End Puppeteer
      await browser.close();
      // return puppetStrings;

      return [data, null];
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  };
  const [data, error] = await puppet();

  res.send(JSON.stringify(data))
});

// REE | Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendStatus;
});

app.get('/barfoo', (req, res) => {
  console.log("+++++++++");
  console.log("REQUEST | params , query , route");
  console.log(req.body);
  console.log(req.params); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log("+++++++++");

  console.log('Sent list of items');
  res.sendStatus
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port: http://localhost:${PORT}`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at: http://localhost:${PORT}${server.graphqlPath}`);
  });
});
