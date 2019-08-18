#!/bin/bash

FORCE=$1

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