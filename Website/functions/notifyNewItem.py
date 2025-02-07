import json
import boto3 
import os 

sns = boto3.client("sns", region_name="us-east-1")
SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']

def lambda_handler(event, context):
    # TODO implement
    for record in event['Records']:
        if record['eventName'] == 'INSERT':
            new_item = record['dynamodb']['NewImage']
            item_name = new_item['itemName']['S']
            area = new_item['areaFound']['S']
            date = new_item['dateFound']['S']
            
            sns.publish(
                TopicArn= SNS_TOPIC_ARN,
                Message= f"New item added to lost & found: {item_name} at {area} at {date}",
                Subject= "New Lost and Found Item Alert"
            )
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully published SNS Message')
    }
