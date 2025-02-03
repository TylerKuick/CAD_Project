import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    s3 = boto3.client('s3', region_name="us-east-1")
    
    path_parameters = event.get("pathParameters")
    photoKey = path_parameters.get("photoKey") if path_parameters else None
    
    s3Params = {
        'Bucket': "tyler-cad-project-images",
        'Key': photoKey
    }
    
    response = s3.generate_presigned_url('put_object', Params=s3Params, ExpiresIn=60)
    
    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",  # Allow all origins
            "Access-Control-Allow-Methods": "GET, OPTIONS",  # Allowed HTTP methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization"  # Allowed headers
        },
        'body': json.dumps(response)
    }
