import json
import boto3
import os

rekognition = boto3.client('rekognition', region_name="us-east-1")
BUCKET = os.environ['S3_BUCKET_NAME']

def lambda_handler(event, context): 
    response = rekognition.detect_labels(Image={'S3Object': {'Bucket': BUCKET, 'Name': event['photoKey']}}, MaxLabels=5)

    labels = response['Labels'][0]['Name']

    return {
        'statusCode': 200,
        'body': json.dumps(labels)
    }