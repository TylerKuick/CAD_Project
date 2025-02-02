import json
import boto3 

def lambda_handler(event, context):
    # TODO implement
    dynamo = boto3.resource("dynamodb", region_name="us-east-1")
    table = dynamo.Table('CADProjectDBTEST')
    table.put_item(
        Item= {
            'itemID': event['itemID'],
            "itemName": event['itemName'],
            "dateFound": event['dateFound'],
            "areaFound": event['areaFound']
        }   
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }
