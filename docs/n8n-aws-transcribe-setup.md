# Setup Guide: n8n with AWS Transcribe

## Table of Contents
1. [Introduction](#introduction)
2. [Obtaining AWS Credentials](#obtaining-aws-credentials)
3. [Configuring the Transcribe Node in n8n](#configuring-the-transcribe-node-in-n8n)
4. [Required Permissions](#required-permissions)
5. [Troubleshooting](#troubleshooting)
6. [Security Best Practices](#security-best-practices)

## Introduction

This guide will help you configure the AWS Transcribe node in n8n to transcribe audio to text. AWS Transcribe is an automatic speech recognition service that makes it easy to convert audio files into text.

### What You DON'T Need

The **API Gateway** menu you mentioned (HTTP API, WebSocket API, REST API, etc.) is **NOT needed** for AWS Transcribe. API Gateway is a different AWS service used to create and manage REST and WebSocket APIs. To use AWS Transcribe with n8n, you only need:
- AWS credentials (Access Key ID and Secret Access Key)
- Appropriate permissions for the Transcribe service

## Obtaining AWS Credentials

### Step 1: Access IAM (Identity and Access Management)

1. Sign in to the [AWS Console](https://console.aws.amazon.com)
2. In the top search bar, type **IAM** and select "IAM" from the results
3. In the left sidebar, click on **"Users"**

### Step 2: Create an IAM User (if you don't have one)

1. Click **"Add users"** or **"Create user"**
2. Enter a username (for example: `n8n-transcribe-user`)
3. Under "Select AWS credential type", check the box for **"Access key - Programmatic access"**
4. Click **"Next: Permissions"**

### Step 3: Assign Transcribe Permissions

You have two options for assigning permissions:

#### Option A: Managed Policy (Easier, Less Secure)
1. Select **"Attach existing policies directly"**
2. Search for and select **"AmazonTranscribeFullAccess"**
3. Click **"Next"** until you reach "Review", then click **"Create user"**

#### Option B: Custom Policy (More Secure, Recommended)
1. Select **"Create policy"**
2. Select the **"JSON"** tab
3. Paste the following minimal policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "transcribe:StartTranscriptionJob",
                "transcribe:GetTranscriptionJob",
                "transcribe:ListTranscriptionJobs",
                "transcribe:DeleteTranscriptionJob"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

> **Note**: Replace `your-bucket-name` with the name of your S3 bucket where you'll store audio files.

4. Click **"Next: Tags"** (optional), then **"Next: Review"**
5. Give the policy a name (e.g., `N8nTranscribePolicy`)
6. Click **"Create policy"**
7. Return to user creation and attach this custom policy

### Step 4: Obtain the Credentials

1. After creating the user, you'll see a page showing:
   - **Access key ID** - example: `AKIAIOSFODNN7EXAMPLE`
   - **Secret access key** - example: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

2. **IMPORTANT!**: This is the **only time** you'll be able to see the Secret Access Key. Download or copy it securely.

3. You can:
   - Click **"Download .csv"** to save the credentials
   - Manually copy both keys to a secure password manager

### Alternative: Use an Existing User

If you already have an IAM user:

1. Go to **IAM** → **Users** → Select your user
2. Go to the **"Security credentials"** tab
3. Under **"Access keys"**, click **"Create access key"**
4. Select the use case: **"Application running outside AWS"** or **"Third-party service"**
5. Click **"Next"**, then **"Create access key"**
6. Save the **Access Key ID** and **Secret Access Key**

## Configuring the Transcribe Node in n8n

### Step 1: Add Credentials in n8n

1. Open your n8n instance
2. Go to **Settings** → **Credentials** (or click the gear icon)
3. Click **"+ Add Credential"**
4. Search for and select **"AWS"** (don't search for "Transcribe" specifically, AWS credentials are generic)
5. Fill in the fields:
   - **Credential Name**: Give it a descriptive name (e.g., "AWS Transcribe Credentials")
   - **Access Key ID**: Paste the AWS Access Key ID
   - **Secret Access Key**: Paste the AWS Secret Access Key
   - **Region**: Select the region where you want to use Transcribe (e.g., `us-east-1`, `us-west-2`, `eu-west-1`)
   
   > ⚠️ **IMPORTANT - Region Selection**: 
   > - AWS Transcribe is not available in all regions
   > - **Don't use** `eu-south-2` (Spain) - may not have full support yet
   > - **Recommended European regions**: `eu-west-1` (Ireland) or `eu-central-1` (Frankfurt)
   > - **Recommended US regions**: `us-east-1` (Virginia) or `us-west-2` (Oregon)
   > - Check availability at: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

6. Click **"Save"**

### Step 2: Use the AWS Transcribe Node

1. In your n8n workflow, click the **"+"** button to add a node
2. Search for **"AWS Transcribe"** in the node list
3. Select the **"AWS Transcribe"** node
4. Configure the node:

   **Main fields:**
   - **Credential to connect with**: Select the AWS credentials you created
   - **Resource**: Select **"Job"** (transcription job)
   - **Operation**: Select the desired operation:
     - **"Create"**: Start a new transcription job
     - **"Get"**: Get the status of a job
     - **"Get All"**: List all jobs
     - **"Delete"**: Delete a job

   **To create a transcription job (Operation: Create):**
   - **Job Name**: Unique name for the job (e.g., `transcription-{{$json["id"]}}`)
   - **Media File URI**: S3 URL of the audio file (e.g., `s3://my-bucket/audio.mp3`)
   - **Language Code**: Language code (e.g., `es-ES` for Spanish, `en-US` for English)
   - **Output Bucket**: (Optional) S3 bucket to save results
   - **Additional Fields**: You can configure additional options like:
     - **Media Format**: File format (mp3, mp4, wav, flac)
     - **Show Speaker Labels**: To identify different speakers
     - **Max Speaker Labels**: Maximum number of speakers to identify

### Step 3: Complete Workflow Example

A typical workflow might be:

```
1. Trigger (Webhook, Schedule, etc.)
   ↓
2. Node to upload file to S3 (AWS S3 node)
   ↓
3. AWS Transcribe node (Create Job)
   ↓
4. Wait node (wait a few seconds)
   ↓
5. AWS Transcribe node (Get Job) - to check status
   ↓
6. IF node - check if job is complete
   ↓
7. Process transcription result
```

## Required Permissions

For AWS Transcribe to work correctly, the IAM user needs:

### Transcribe Permissions
- `transcribe:StartTranscriptionJob` - Start transcription jobs
- `transcribe:GetTranscriptionJob` - Get job status
- `transcribe:ListTranscriptionJobs` - List jobs
- `transcribe:DeleteTranscriptionJob` - Delete jobs (optional)

### S3 Permissions (Required)
AWS Transcribe needs S3 access to:
- Read input audio files
- Write transcription results

```json
{
    "Effect": "Allow",
    "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
    ],
    "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
    ]
}
```

## Troubleshooting

### Error: "InvalidAccessKeyId"
**Problem**: The Access Key ID is invalid or misspelled.
**Solution**: 
- Verify that you copied the Access Key ID correctly
- Make sure there are no extra spaces at the beginning or end
- Verify that the IAM user hasn't been deleted

### Error: "SignatureDoesNotMatch"
**Problem**: The Secret Access Key is incorrect.
**Solution**: 
- Verify that you copied the Secret Access Key correctly
- If unsure, generate a new key pair in IAM

### Error: "AccessDenied" or "UnauthorizedOperation"
**Problem**: The IAM user doesn't have sufficient permissions.
**Solution**: 
- Go to IAM → Users → Your user → Permissions
- Verify it has the `AmazonTranscribeFullAccess` policy or a custom policy with necessary permissions
- Ensure it also has S3 permissions

### Error: "Forbidden" when testing connection in n8n
**Problem**: Credentials are rejected when trying to connect from n8n.
**Common causes**:

1. **Region not available or enabled**:
   - AWS Transcribe is not available in all regions
   - Region `eu-south-2` (Spain) may not have Transcribe enabled yet
   - **Solution**: Use a fully supported region like:
     - `eu-west-1` (Ireland)
     - `eu-central-1` (Frankfurt)
     - `us-east-1` (N. Virginia)
     - `us-west-2` (Oregon)

2. **IAM user without correct permissions**:
   - User may exist but lack necessary policies
   - **Solution**: 
     - Go to IAM → Users → [Your user] → Permissions
     - Verify it has at least `AmazonTranscribeFullAccess`
     - Also add S3 permissions if missing

3. **Credentials copied incorrectly**:
   - Extra spaces when copying/pasting
   - Hidden characters or line breaks
   - **Solution**:
     - Re-copy the Access Key ID without spaces
     - Regenerate the Secret Access Key if needed

4. **MFA (Multi-Factor Authentication) required**:
   - If your AWS account requires MFA, you need temporary credentials
   - **Solution**: Use "Temporary Security Credentials" in n8n

**How to verify your credentials**:

You can test your credentials using AWS CLI before configuring n8n:

```bash
# Install AWS CLI if you don't have it
# On Linux/Mac:
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure your credentials
aws configure
# Enter: Access Key ID, Secret Access Key, region (e.g., eu-west-1)

# Test the connection by listing transcription jobs
aws transcribe list-transcription-jobs --region eu-west-1

# If it works, you'll see a JSON response (may be empty if no jobs exist)
# If it fails, you'll see a specific error that will help diagnose
```

### Error: "BadRequestException: The media format is not supported"
**Problem**: The audio file format is not supported.
**Solution**: 
- AWS Transcribe supports: MP3, MP4, WAV, FLAC, AMR, OGG, WebM
- Convert your file to the appropriate format
- Correctly specify the "Media Format" parameter in the node

### Error: "The S3 object does not exist"
**Problem**: AWS Transcribe can't find the audio file in S3.
**Solution**: 
- Verify the S3 URI is correct (format: `s3://bucket-name/path/to/file.mp3`)
- Ensure the file actually exists in S3
- Verify the IAM user has read permissions on that bucket

### Job Stays in "IN_PROGRESS" State
**Problem**: The transcription job is processing.
**Solution**: 
- Transcription jobs can take several minutes depending on audio duration
- Use a "Wait" node or implement polling to check status periodically
- General rule: ~1 minute of processing per minute of audio

## Security Best Practices

### 1. Principle of Least Privilege
- Don't use AWS root credentials
- Create specific IAM users for each application
- Assign only necessary permissions

### 2. Credential Rotation
- Rotate Access Keys regularly (every 90 days is recommended)
- Delete old keys after rotation

### 3. Secure Storage
- Never share credentials in source code
- Don't upload them to Git repositories
- Use environment variables or secret managers
- In n8n, credentials are stored encrypted

### 4. Monitoring
- Enable AWS CloudTrail to audit credential usage
- Set up alerts for suspicious activities
- Regularly review access logs

### 5. Use IAM Roles When Possible
If n8n is running on AWS (EC2, ECS, Lambda):
- Use IAM Roles instead of Access Keys
- Roles are more secure and don't require manual credential management
- Temporary credentials rotate automatically

### 6. Configure S3 Bucket Policies
Ensure your S3 bucket has the correct policies:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowTranscribeRead",
            "Effect": "Allow",
            "Principal": {
                "Service": "transcribe.amazonaws.com"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

## Additional Resources

### Official Documentation
- [AWS Transcribe - Developer Guide](https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html)
- [n8n - AWS Transcribe Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe/)
- [IAM - Security Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

### AWS Transcribe Pricing
- [AWS Transcribe Pricing Page](https://aws.amazon.com/transcribe/pricing/)
- AWS Transcribe charges per second of transcribed audio
- Free tier available for new users (first 12 months)

### Language Support
- [Languages Supported by AWS Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html)
- Spanish: `es-ES` (Spain), `es-US` (US)
- English: `en-US`, `en-GB`, `en-AU`, etc.
- Over 100 languages and dialects available

## Conclusion

You should now be able to correctly configure the AWS Transcribe node in n8n. Remember:

1. ✅ **You need**: Access Key ID and Secret Access Key from IAM (not API Gateway)
2. ✅ **Permissions**: For AWS Transcribe and S3
3. ✅ **Configuration**: Credentials in n8n and the node configured correctly
4. ✅ **Security**: Apply security best practices

If you have issues, check the [Troubleshooting](#troubleshooting) section or the official AWS and n8n documentation.

---

**Note**: This guide was created to help you integrate external services with PromptCraft Pro. AWS credentials are personal and should not be shared with the code repository.
