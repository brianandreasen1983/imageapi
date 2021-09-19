This readme is design to let you know how to run the project as intended.

Once the repository is cloned you will need to type in npm install or yarn install in order to install all of the dependencies.

To run the server in the root of the project in terminal or in VS Code type in yarn start this should run the local dev server on http://localhost:3000

To test this you can use a REST client tool such as postman and hit the api endpoint
http://localhost:3000/api

You should receive a status of 200 with the text of Hello world being returned. 

The endpoint to test is the image endpoint which is located at http://localhost:3000/api/image

There are three required query parameters: imagename, height, and width if any of these three parameters are not present a request will not be successful and return a status code of 400 which is a bad request.

the following imagenames are supported in order to resize the image you are requesting.
encenadaport.jpg
fjord.jpg
icelandwaterfall.jpg
palmtunnel.jpg
santamonica.jpg

If none of these are supplied as a fully qualified .jpg file you can expect it to fail.

If a requested resource is not found because the asset doesn't exist you can expect the endpoint to return that it can't be found.

In order to run the tests for the repository you can type into terminal yarn test which will allow you to run all of the tests and lint the code.

If you have any questions in how to run the repository please reach out to the author.