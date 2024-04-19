#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050"

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

export MAKER_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.contracts[] | select(.name == "matchmaker::systems::maker::maker" ).address')

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo maker : $MAKER_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> models authorizations
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Player,$MAKER_ADDRESS \
  Registry,$MAKER_ADDRESS \
  Slot,$MAKER_ADDRESS \
  League,$MAKER_ADDRESS >/dev/null

echo "Default authorizations have been successfully set."