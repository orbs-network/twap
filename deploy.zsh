#!/bin/zsh
set -euo pipefail

config=./configs.json

trap chain EXIT

export ALLOWED="0xA05405b6340A7F43dC5835351BFC4f5b1F028359,0xE3Efef1563a5960ACc731F9e4d6f4cBf5bd87dcA"
export ADMIN=$(a admin)

# Extract unique sorted chain IDs
chain_ids=($(jq -r '.[].chainId' $config | sort -n | uniq))

for chain_id in "${chain_ids[@]}"; do
    if [[ $chain_id -eq 324 ]]; then
        echo "Skipping zkSync chain (324)"
        continue
    fi

    # Collect all TWAP addresses for this chain_id
    twap_addresses=($(jq -r --argjson cid "$chain_id" '
        to_entries[] | select(.value.chainId == $cid) | .value.twapAddress' $config | sort -u))

    if [[ ${#twap_addresses[@]} -ne 1 ]]; then
        echo "Error: Multiple TWAP addresses found for chain $chain_id: ${twap_addresses[*]}"
        exit 1
    fi

    twap_address=${twap_addresses[1]}  # zsh arrays are 1-based by default

    chain $chain_id
    autosign

    echo "\n🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗 ($CHAIN_NAME $chain_id) 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n"

    export TWAP=$twap_address

    echo "Deploying Takers for TWAP: $TWAP"
    forge script DeployTakers --broadcast
done
