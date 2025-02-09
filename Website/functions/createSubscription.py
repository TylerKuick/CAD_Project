import json
import boto3 
import os 

sns = boto3.client('sns', region_name='us-east-1')
SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']

def lambda_handler(event, context):
    # TODO implement
    email = event['email'] 
    category = event['category']
    
    subs = sns.list_subscriptions_by_topic(TopicArn=SNS_TOPIC_ARN)
    sub_arn = None
    for sub in subs['Subscriptions']:
        if sub['Endpoint'] == email:
            sub_arn = sub["SubscriptionArn"]
            sns.unsubscribe(SubscriptionArn=sub_arn)
            
    if category != "None":
        filter_policy = {"category": [category]}

        response = sns.subscribe(
            TopicArn = SNS_TOPIC_ARN,
            Protocol="email",
            Endpoint=email,
            Attributes={"FilterPolicy": json.dumps(filter_policy)}
        )
    else: 
        response = sns.subscribe(
            TopicArn = SNS_TOPIC_ARN,
            Protocol="email",
            Endpoint=email
        )
        
    return {
        'statusCode': 200,
        'body': json.dumps(response.get("SubscriptionArn"))
    }
