#!/bin/bash

FORCE=$1

# Credit goes to Stefan Farestam from StackOverflow
function parse_yaml {
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
}
function force {
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
    ENV=$1
    CONT=true
}
if [[ $FORCE == "-f" ]] || [[ $FORCE == "--force" ]]; then
    force $2
fi

if [[ $CONT = false ]]; then
    exit
fi

eval $(parse_yaml config.yml)
ENV_STORE=$ENV"_store"
if [[ -z ${!ENV_STORE+x} ]]; then
    echo "The environment '$ENV' is not defined in config.yml!"
    CONT=false
    exit
fi

if [[ $ENV == $CURRENT_ENV ]]; then
    echo "You're already mirroring that environment!"
    CONT=false
    exit
fi

# Swap settings_data.json with our target environment's.
$(mv "./config/settings_data.json" "./config/settings_data.$CURRENT_ENV.json")
echo "'settings_data.json' -> 'settings_data.$CURRENT_ENV.json'"

$(mv "./config/settings_data.$ENV.json" "./config/settings_data.json")
echo "'settings_data.$ENV.json' -> 'settings_data.json'"

# Overwrite the .tmp file with the new environment.
TMP_FILE=./scripts/.tmp
echo "# DO NOT TOUCH" > "$TMP_FILE"
echo "CURRENT_ENV=\"$ENV\"" >> "$TMP_FILE"