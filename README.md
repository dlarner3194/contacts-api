# SingleStone Contact API

This is a Rest API is created in order to perform CRUD operations on the client collection.

## Endpoints

| HTTP Method | Route          | Description            |
| ----------- | -------------- | ---------------------- |
| GET         | /contacts      | List all contacts      |
| POST        | /contacts      | Create a new contact   |
| PUT         | /contacts/{id} | Update a contact       |
| GET         | /contacts/{id} | Get a specific contact |
| DELETE      | /contacts/{id} | Delete a contact       |

The input format contains the following (JSON):

```json
{
  "name": {
    "first": "string",
    "middle": "string",
    "last": "string"
  },
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },
  "phone": [
    {
      "number": "string",
      "type": "string"
    }
  ],
  "email": "string"
}
```

The return format will contain the following (JSON):

```json
{
  "id": "number",
  "name": {
    "first": "string",
    "middle": "string",
    "last": "string"
  },
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },
  "phone": [
    {
      "number": "string",
      "type": "string"
    }
  ],
  "email": "string"
}
```

## Data store

The application uses the embedded/in-memory data store [NeDB](https://github.com/louischatriot/nedb). The only collection is the contact collection (above).

## Running the application

### Local

1. Install dependencies with `npm install`
2. Build the application with `npm run build`
3. Start the application with `npm run start`

You can make requests using the command line (curl, httpie, etc.)

For example:

(Listing call) curl -X GET http://localhost:3000/

(Get a contact) curl -X GET http://localhost:3000/contacts/1

(Create a contact) curl -X POST -H "Content-Type: application/json" -d @./contact.json http://localhost:3000/contacts

(Update a contact) curl -X PUT -H "Content-Type: application/json" -d '{"email": "updatedemail@mail.com"}' http://localhost:3000/contacts/84

(Remove a contact) curl -X DELETE -H "Content-Type: application/
json" http://localhost:3000/contacts/84

### Containerizing the application

1. Build the image `docker build . -t contacts-api`
2. Run the application `docker run -p 3000:3000 contacts-api`

### Push to DockerHub

```bash
$ docker login # Use your Docker Hub credentials here
$ docker tag ec2-app <YOUR_DOCKER_USERNAME>/contacts-api
$ docker push <YOUR_DOCKER_USERNAME>/contacts-api
```

## Deploying the application to AWS

One way to deploy this application to the cloud (AWS) is to create an EC2 instance, ssh into the instance, install docker, and run the image from there.

Steps to do this:

1. Package the template: `aws cloudformation package --template-file ./infrastructure/template.yaml --s3-bucket $CFT_BUCKET --output-template-file ./infrastructure/template.package.yaml`
2. Deploy the template: `aws cloudformation deploy --template-file ./infrastructure/template.package.yaml --stack-name $YOUR_STACK_NAME`
3. ssh in the instance `ssh -i ./your-key-pair.pem ec2-user@ec2-dns.compute-1.amazonaws.com`
4. Run the following:

```bash
$ sudo yum update -y
$ sudo amazon-linux-extras install docker
$ sudo service docker start
$ sudo usermod -a -G docker ec2-user
# verify docker commands can be run without sudo
$ docker info
# run docker image deployed in the previous steps
$ docker run -p 3000:3000 <YOUR_DOCKER_USERNAME>/contacts-api
```

## Unit Testing

Run unit tests (located in the `test/unit` directory) with `npm run test`
