const yaml = require("js-yaml");
const fs = require("fs");

// Get document, or throw exception on error
const doc = yaml.load(fs.readFileSync("./books.yml", "utf8"));

console.log(`

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Books - Michael P. Jones</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="Michael Jones" />

    <!-- Le styles -->
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <style>
      * {
          box-sizing: border-box;
      }

      body {
        padding-top: 60px;
        font-size: 17px;

        color: #171f42;
        background-color: #fefaf3;

        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }

      h1,
      h2,
      h3 {
          margin-bottom: 10px;
      }

      h2 {
          padding-bottom: 5px;
          border-bottom: 2px solid #171f42;
      }

      .text-muted {
        color: #464677;
      }

      .grid-box {
        display: grid;
        grid-template-columns: minmax(15px, 1fr) minmax(300px, 800px) minmax(15px, 1fr);
        grid-template-areas:
          ". main ."
          ". footer .";
      }

      main {
        grid-area: main;
        display: flex;
        flex-direction: column;
      }

      footer {
        grid-area: footer;
      }

      ul.no-style {
        list-style: none;
        padding-left: 0;
      }

      div.card-row {
        display: flex;
        flex-wrap: wrap;
      }

      div.card {
        display: block;
        width: 50%;
      }

      a {
        color: #a24400;
      }

      table {
        margin-bottom: 2rem;
      }

      td {
        vertical-align: top;
      }

      @media (max-width: 800px) {
        td {
          padding-bottom: 1rem;
        }
      }

      td:nth-child(2) {
        text-align: right;
      }

      .section-header {
        font-weight: bold;
        padding-top: 2rem;
      }
    </style>

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png" />
  </head>

  <body>
    <div class="grid-box">
      <main>
      <h1>Books</h1>
      <table>
`);

const books = [];
let index = 0;

for (let entry of doc.books) {
    for (book of entry.books) {
        const authors = entry.authors !== undefined ? entry.authors : [entry.author];
        books.push({
            index,
            title: book.title,
            sectionDate: book.date.toString().slice(0, 4),
            date: book.date,
            authors,
        });
        index++;
    }
}

const sections = {};
for (let book of books) {
    sections[book.sectionDate] =
        sections[book.sectionDate] === undefined ? [book] : [...sections[book.sectionDate], book];
}

// console.error(sections);

const order = [
    { section: "2021", title: "2021" },
    { section: "2020", title: "2020" },
    { section: "2019", title: "2019" },
    { section: "2018", title: "2018" },
    { section: "2017", title: "2017" },
    { section: "2016", title: "2016" },
    { section: "2015", title: "2015" },
    { section: "2014", title: "2014" },
    { section: "2013", title: "2013" },
    { section: "2012", title: "2012" },
    { section: "2011", title: "2011" },
    { section: "2010", title: "2010" },
    { section: "201", title: "2010s" },
    { section: "200", title: "2000s" },
    { section: "199", title: "1990s" },
];

function shortenAuthor(name) {
    const names = name.split(" ");
    const firstNames = names.slice(0, -1);
    const lastName = names[names.length - 1];

    return `${firstNames.map((name) => name[0]).join(" ")} ${lastName}`;
}

for (let entry of order) {
    const bookList = sections[entry.section];
    if (bookList) {
        console.log(`
<tr>
    <td colspan="2" class="section-header">${entry.title}</td>
</tr>
            `);

        bookList.sort((a, b) => {
            // Sort by date, then author, then index
            if (a.date === b.date) {
                const aAuthors = a.authors.join(",");
                const bAuthors = b.authors.join(",");
                if (aAuthors === bAuthors) {
                    return a.index - b.index;
                } else {
                    if (aAuthors > bAuthors) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            } else {
                if (new Date(a.date) > new Date(b.date)) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        for (book of bookList) {
            let authors = book.authors.join(", ");
            if (book.authors.length > 1) {
                authors = book.authors.map(shortenAuthor).join(", ");
            }

            console.log(`
<tr>
    <td>${book.title}</td>
    <td>${authors}</td>
</tr>
            `);
        }
    }
}

console.log(`

      </table>
      </main>

      <hr />

      <footer>
        <p>&copy; Michael Jones 2012-2021.</p>
      </footer>
    </div>
  </body>
</html>
`);
