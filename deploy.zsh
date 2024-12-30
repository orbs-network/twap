#!/bin/zsh
set -euo pipefail

config=./configs.json

trap chain EXIT

chains=$(jq -r ".[].chainId" $config | sort -u | grep -v '324') # zkSync not supported, use foundry-zksync

echo $chains | parallel --keep-order "
    echo \"\n🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗 {} 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\";
    chain {};
    export TWAP=\$(jq -r 'map(select(.chainId == {})) | unique_by(.twapAddress) | .[].twapAddress' $config);
    export ADMIN=\$(a admin);

    forge script DeployTakers #--broadcast --verify \$([[ -n \$VERIFIER ]] && echo --verifier \$VERIFIER);
    "

