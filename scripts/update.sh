#!/bin/bash

DIR=${PWD##*/}
if [[ $DIR == "scripts" ]]; then
    cd ..
elif [[ $DIR == "rm-shopify-theme" ]]; then
    break
else 
    echo "Bad directory. Make sure you're in the root of the repo (or in ./scripts)."
    exit
fi

source ./scripts/.tmp
source ./scripts/common.sh

if [[ $CONT = true ]]; then
    theme download --env=$ENV config/settings_data.json
fi