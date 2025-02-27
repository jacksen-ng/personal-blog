---
title: 'Learning Google Cloud Compute Engine'
date: '2024-02-26'
description: 'This blog is about learning Google Cloud Compute Engine'
---

Language: English

## Create a Compute Engine Instance in Google Cloud

- Open the Google Cloud Console
- Click on the "Compute Engine" link in the left-hand sidebar
- Click on the "Create Instance" button
- Select the "Ubuntu" operating system -> I will suggest to use Ubuntu 22.04 LTS
- Click on the "Create" button

## SSH into Compute Engine instance(In browser)

- Open the Google Cloud Console
- Click on the "Compute Engine" link in the left-hand sidebar
- Click on the "SSH" button next to the instance you want to connect to
- Enter the username "ubuntu" and press Enter
- Enter the password you set for the instance when you created it

## SSH into Compute Engine instance(In local terminal)

- Create a ssh key in local machine

```bash
ssh-keygen -t rsa -b 2048
```

- Copy the ssh key to the instance

```bash
cat ~/.ssh/id_rsa.pub | ssh -i ~/.ssh/google_compute_engine ubuntu@<your-instance-ip> "cat >> ~/.ssh/authorized_keys"
```

- Or you can follow bellow steps to copy the ssh key to the instance
Open Google Console → MetaData → SSH Keys → Create or Edit → Copy and the ssh key 

- After that, you can connect to the instance using ssh

```bash
ssh ubuntu@<your-instance-ip>
```

## Use gcloud command to connect to the instance

- Install Google Cloud SDK

```bash
brew install google-cloud-sdk
```

- Login to Google Cloud

```bash
gcloud auth application-default login
```

- Connect to the instance

```bash
gcloud compute ssh --zone "us-central1-a" "your-instance-name" --command "ls -l"
```



