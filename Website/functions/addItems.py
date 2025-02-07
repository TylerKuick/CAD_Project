import json
import boto3 

def lambda_handler(event, context):
    # TODO implement
    dynamo = boto3.resource("dynamodb", region_name="us-east-1")
    table = dynamo.Table('CADProjectDB')
    table.put_item(
        Item= {
            'itemID': event['itemID'],
            "itemName": event['itemName'],
            "itemNameLower": event['itemName'].lower(),
            "dateFound": event['dateFound'],
            "areaFound": event['areaFound'],
            "category": event['category'],
            "categoryLower": event['category'].lower()
        }   
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }
