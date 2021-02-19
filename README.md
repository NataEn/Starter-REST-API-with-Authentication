# Starter-REST-API-with-Authentication

Simple REST API with user authentication build with Express and MongoDB

# To test the REST API:

## Data Items -mongoDB

1. creating data Items:
   post request to "http://localhost:/<port>/api/data/set" with json body of:

```
{
	"name":"name1",
	"value":782323
}
```

2. get specific data item:
   get request to "http://localhost:<port>/api/data/items/name2"

3. get all data items:
   get request to: "http://localhost:<port>/api/data/items"

4. update data item:
   put request to "http://localhost:<port>/api/data/items/update/name2?name=my%20name&value=123"

5. delete specific data item:
   delete request to "http://localhost:<port>/api/data/items/delete/name3"

   ## Users

   1. create a user:
      post request to "http://localhost:<port>/api/auth/signup"

   json body:

   ```
   {
   	"email":"test@gmail.com",
   	"password":"123456"
   }
   ```

   --> will return a token that needs to be saved on the client side 2. login user:
   post request to "http://localhost:<port>/api/auth/login"
   json body:

   ```
   {
   	"email":"test@gmail.com",
   	"password":"123456"
   }
   ```

   --> will return a token that needs to be saved on the client side

   3. logout user:
      --> on the client side just delete the saved token

   4. authenticated route:
      get request to "http://localhost:<port>/api/dashboard"
