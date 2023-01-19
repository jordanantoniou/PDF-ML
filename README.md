# Class-ifier
An application which uses OCR (Optical Character Recognision) and NLP (Natural Language Processing) to extract text from PDF files and classify them.

## Getting Started

### Prerequisites

* You must install Node (Developed using v18.8.0)
* You must install [Poppler](https://www.npmjs.com/package/node-poppler)
* Create a MongoDB instance (This can be local or atlas). 
* An `.env` environment file containing the following variables:
    * A `MONGODB_URL` variable in the format of a [MongoDB Connection String](https://www.mongodb.com/docs/manual/reference/connection-string/)
    * A `DATABASE` variable with the name of the database.
    * A `POPPLER_HOME` variable with the path to the poppler installation directory. (Can use `whereis pdfToCairo` in terminal to find the path)


### Running the Application

You can then start the client and server individually by running `npm start` their retrospective directories.

The client will be avialable via `http://localhost:3000` and the server will be available via `http://localhost:8080`.

### Inserting Training Data

You need to train the classifier prior to classifying the PDF files. Thankfully the `/storage/insert` endpoint does this for you.

All you need to do is add a new folder in the `training-data` directory (name this folder what you would like the classifcation to be) and add some PDF files within this folder.

These files will then be inserted into the database ready to be used for training.

NOTE: Please do not nest any folders within `training-data` as this will break the application.


## Architecture

[Insert Diagram Here...]

The Client is a React Web Application which supports uploading PDF files, sending them to the Server to be classified and displaying the results.

The Server is a Node, Express API which uses [Tesseract Js](https://tesseract.projectnaptha.com/) to extract the text from PDF files and [Natural](https://naturalnode.github.io/natural/) to classify them using a trained classifier.

The MongoDB instance is used to store the PDF files used to train the classifer.

## API Documentation

The Server API is documented using [Swagger](https://swagger.io/) and can be found via `http://localhost:8080/docs` when the server is running.

