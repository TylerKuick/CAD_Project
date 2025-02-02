import json
import boto3 
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    # TODO implement
    dynamo = boto3.resource("dynamodb", region_name="us-east-1")
    table = dynamo.Table('CADProjectDBTEST')

    # Search for items using partition key "ItemID"
    response = table.scan()
    items = response['Items']

    # Scan for items using other attributes

    
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
