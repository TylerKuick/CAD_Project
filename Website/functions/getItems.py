import json
import boto3 
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    # TODO implement
    dynamo = boto3.resource("dynamodb", region_name="us-east-1")
    table = dynamo.Table('CADProjectDB')
    
    query_params = event.get("queryStringParameters", {})
    search_query = query_params.get('search')
    if not search_query: 
        response = table.scan()
        items = response['Items']
    else: 
        response = table.scan(FilterExpression=Attr('itemNameLower').contains(search_query) | Attr('categoryLower').contains(search_query))
        items = response['Items']

    return {
        'statusCode': 200,
        'headers': {
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        'body': json.dumps(items)
    }
