import boto3
import json

# Delete Item from DynamoDB
def lambda_handler(event, context):
    dynamo = boto3.resource("dynamodb", region_name="us-east-1")
    table = dynamo.Table('CADProjectDB')
    try: 
        path_parameters = event.get("pathParameters")
        item_id = path_parameters.get("id") if path_parameters else None
        response = table.delete_item(Key={
            "itemID": item_id
            }
        )
        
        statusCode = response['ResponseMetadata']['HTTPStatusCode']
        
        return {
            'statusCode': statusCode,
            "body": json.dumps("Successfully Deleted")
        }
    except Exception as e: 
        return {
            'statusCode': 500,
            "body": json.dumps(f"Error: {str(e)}. Unable to delete item")
        }