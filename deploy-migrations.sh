#!/bin/bash
# Deploy PocketBase migrations to GCP VM

set -e

echo "Deploying migrations to GCP..."

# Copy migrations to VM
gcloud compute scp --recurse ./pb_migrations pocketbase-vm:/tmp/ --zone=us-central1-a

# Move migrations and restart PocketBase
gcloud compute ssh pocketbase-vm --zone=us-central1-a --command="
  sudo rm -rf /opt/pocketbase/pb_migrations
  sudo mv /tmp/pb_migrations /opt/pocketbase/
  sudo chown -R root:root /opt/pocketbase/pb_migrations
  sudo systemctl restart pocketbase
"

echo "Migrations deployed successfully!"
echo "PocketBase restarted at http://34.63.118.19:8090"
