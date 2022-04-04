# Custom Markdown Text

This text will be replaced:

<SandboxLoaderWithCustomText>
   To get started, click the **Get Environment Details** banner at the top of the page to create your own development environment and get
   your environment details! **This might take a minute or two**.

   After you open the environment, click the **Terminal** button at the top of the page and then click **New Terminal**.

   When the terminal opens, type out `python3` and hit enter. Then, start coding in Python whenever you're ready!

   Below is an example of creating a DynamoDB table using boto3. If you've already clicked the button above to receive your environment details, the example code should be filled in with variable values specific to your environment (if you haven't clicked it yet, you'll only see filler text, so take a moment to do that now). 

   Once the variable values have populated, copy the code from below and paste it directly into the Python interpreter in your terminal, then press enter to run it:

   ```python

   # Create a DynamoDB Table
   import boto3

   dynamodb = boto3.client("dynamodb")

   response = dynamodb.create_table(
   TableName="TABLE_NAME_VARIABLE",
   AttributeDefinitions=[
      {
         "AttributeName": "artist",
         "AttributeType": "S"
      },
      {
         "AttributeName": "song",
         "AttributeType": "S"
      }
   ],
   KeySchema=[
      {
         "AttributeName": "artist",
         "KeyType": "HASH"
      },
      {
         "AttributeName": "song",
         "KeyType": "RANGE"
      }
   ],
   ProvisionedThroughput={
      "ReadCapacityUnits": 1,
      "WriteCapacityUnits": 1
   }
   )

   print(response)
   ```
</SandboxLoaderWithCustomText>