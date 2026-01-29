#!/bin/bash
# Deploy PocketBase migrations to GCP VM

set -e

VM_NAME="pocketbase-vm"
ZONE="us-central1-a"
PROJECT="slice-of-life"

echo "Setting GCP project to ${PROJECT}..."
gcloud config set project ${PROJECT}

echo "Deploying migrations to GCP..."

# Copy migrations to VM
gcloud compute scp --recurse ./pb_migrations ${VM_NAME}:/tmp/ \
  --zone=${ZONE}

# Move migrations and restart PocketBase
gcloud compute ssh ${VM_NAME} --zone=${ZONE} --command="
  sudo rm -rf /opt/pocketbase/pb_migrations
  sudo mv /tmp/pb_migrations /opt/pocketbase/
  sudo chown -R root:root /opt/pocketbase/pb_migrations
  sudo systemctl restart pocketbase
"

echo "Migrations deployed successfully!"
echo "PocketBase restarted at http://34.63.118.19:8090"
