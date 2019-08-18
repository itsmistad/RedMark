#!/bin/bash

DIR=${PWD##*/}
if [[ $DIR == "scripts" ]]; then
    cd ..
elif [[ $DIR == "RedMark" ]]; then
    break
else 
    echo "Bad directory. Make sure you're in the root of the repo (or in ./scripts)."
    exit
fi

source ./scripts/.tmp
source ./scripts/common.sh
source ./scripts/swap.sh

# Beam me... down?
if [[ $CONT = true ]]; then
    # Pull the target environment's files from Shopify.
    theme get --env=$ENV
fi