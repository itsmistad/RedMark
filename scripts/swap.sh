#!/bin/bash

if [ $CONT = false ]; then
    exit
fi

# I mean you COULD run this independently, but it would definitely break things. So, ...don't?

if [ $ENV == $CURRENT_ENV ]; then
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