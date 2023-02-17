import Document, { Html, Head, Main, NextScript } from "next/document";

//,It must be class based component ,this file(must be named _document.js) allows us to define general structure of our page,eg set an attribute on the html element itself,extra entry point ,extra elements which we could use with react portals

//by adding this file restart dev server needed
//by adding this file and _app.js file we prove that we not only prepare page to see by visitors but also add correct metadata to make seo good and for other benefits for proper page
class MyDocument extends Document {
  render() {
    //To utilize this _document.js file to actually render this notification.js component of ui folder component  through a portal w/o this the notification is showing correctly because of its styling but it is actually just dumped into this complex html structure somewhere nested in our html element tree ,while its look correctly but its not correct semantically and it can make our page bit more inaccessible,,thats why we have this feature called react portals,which allow us to render a component anywhere in our component tree

    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
