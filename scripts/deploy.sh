#!/bin/bash

if [ -f ./common.sh ]; then
    cd ..
elif [ ! -f ./config.yml ]; then
    echo "Bad directory. Make sure you're in the root of the repo."
    exit
fi

source ./scripts/common.sh

if [ $CONT = true ]; then
    theme deploy --env=$ENV
fi