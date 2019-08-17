#!/bin/bash

# I mean you COULD run this independently, but it wouldn't be useful. So, ...don't?

ENV=$1
CONT=false

if [ -z "$ENV" ]
then
    echo "No environment specified. Defaulting to '$CURRENT_ENV'"
    ENV="$CURRENT_ENV"
fi
while true; do
    read -p "Are you sure? [y/n]: " yn
    case $yn in
        [Yy]* ) CONT=true; break;;
        [Nn]* ) exit;;
        * ) echo "Try again. [y/n]: ";;
    esac
done

# Credit goes to Stefan Farestam from StackOverflow
function parse_yaml {
    echo
    local prefix=$2
    local s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
    sed -ne "s|^\($s\):|\1|" \
        -e "s|^\($s\)\($w\)$s:$s[\"']\(.*\)[\"']$s\$|\1$fs\2$fs\3|p" \
        -e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
    awk -F$fs '{
      indent = length($1)/2;
      vname[indent] = $2;
      for (i in vname) {if (i > indent) {delete vname[i]}}
      if (length($3) > 0) {
         vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
         printf("%s%s%s=\"%s\"\n", "'$prefix'",vn, $2, $3);
      }
   }'
   echo
}

if [ ! -f ./config.yml ]; then
    echo "Unable to find './config.yml'."
fi

# Parses config.yml and loads the resulting bash-friendly variables into the shell.
eval $(parse_yaml config.yml)

# Verifies that the environment the user typed is in the config.yml.
ENV_STORE=$ENV"_store"
if [ -z ${!ENV_STORE+x} ]; then
    echo "The environment '$ENV' is not defined in config.yml!"
    CONT=false
    exit
fi