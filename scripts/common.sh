#!/bin/bash

ENV=$1
CONT=false
if [ -z "$ENV" ]
then
    echo "No environment specified. Defaulting to 'dev'"
    ENV="dev"
fi
while true; do
    read -p "Are you sure? [y/n]: " yn
    case $yn in
        [Yy]* ) CONT=true; break;;
        [Nn]* ) exit;;
        * ) echo "Try again. [y/n]: ";;
    esac
done